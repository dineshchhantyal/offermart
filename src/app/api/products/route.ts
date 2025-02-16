import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyExpiryDate } from "@/lib/ai/verify-expiry";
import { auth } from "../../../../auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      brand,
      category,
      price,
      discountedPrice,
      expiryDate,
      images,
      size,
      isDonation,
      commission,
      unit,
      pickupAddress,
    } = body;

    // Verify expiry date using AI
    const isExpiryValid = await verifyExpiryDate(images[0], expiryDate);
    if (!isExpiryValid) {
      return new NextResponse("Invalid expiry date", { status: 400 });
    }

    const product = await db.product.create({
      data: {
        title,
        description,
        brand,
        categoryId: category,
        price,
        discountedPrice,
        expiryDate,
        size,
        isDonation,
        commission,
        sellerId: session.user.id,
        unit,
        pickupAddress,
        images: {
          createMany: {
            data: images.map((url: string) => ({ url })),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
