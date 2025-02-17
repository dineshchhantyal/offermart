import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { CreateOrderRequest, OrderItem } from "@/types/order";
import { OrderStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await currentUser();
    if (!session?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body: CreateOrderRequest = await req.json();

    // Calculate total from items
    const total = body.items.reduce(
      (acc: number, item: OrderItem) => acc + item.price * item.quantity,
      0
    );

    // Create the order using a transaction
    const order = await db.$transaction(async (tx) => {
      // Create main order with proper relations
      const order = await tx.order.create({
        data: {
          user: {
            connect: { id: session.id },
          },
          status: OrderStatus.PENDING,
          shippingAddress: body.address,
          city: body.city,
          state: body.state,
          zipCode: body.zipCode,
          phoneNumber: body.phone,
          email: body.email,
          deliveryInstructions: body.deliveryInstructions ?? null,
          total: total,
          items: {
            create: body.items.map((item: OrderItem) => ({
              product: { connect: { id: item.productId } },
              seller: { connect: { id: item.sellerId } },
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
              seller: true,
            },
          },
        },
      });

      // Update product quantities
      for (const item of body.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: order.status,
      items: order.items,
    });
  } catch (error) {
    console.error("[ORDERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
