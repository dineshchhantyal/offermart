import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyExpiryDate } from "@/lib/ai/verify-expiry";
import { auth } from "../../../../auth";

const dummyProducts = [
  {
    id : "1",
    title: "Product 1",

    description:
      "Enjoy an exclusive discount on Product 1 with high quality electronics.",
    brand: "Brand A",
    category: "Electronics",
    images: [
      "https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    originalPrice: 120,
    price: 100,
    discountedPrice: 80,
    quantity: 50,
    unit: "pieces",
    size: "Medium",
    condition: "NEW",
    manufacturerDate: new Date("2023-01-01"),
    expiryDate: new Date("2024-01-01"),
    bestBefore: new Date("2023-12-01"),
    pickupAddress: "123 Market St, City A",
    isDeliveryAvailable: true,
    deliveryFee: 5,
    deliveryNotes: "Leave at the front desk",
    allergenInfo: "None",
    storageInfo: "Keep refrigerated",
    isDonation: false,
    paymentMethods: ["CARD"],
  },
  {
    id : "2",
    title: "Product 2",
    description:
      "Grab the deal before it expires! Limited time offer on fashion items.",
    brand: "Brand B",
    category: "Fashion",
    images: [
      "https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop"
    ],
    originalPrice: 250,
    price: 200,
    discountedPrice: 150,
    quantity: 30,
    unit: "pieces",
    size: "Large",
    condition: "LIKE_NEW",
    manufacturerDate: new Date("2023-02-01"),
    expiryDate: new Date("2024-02-01"),
    bestBefore: new Date("2024-01-01"),
    pickupAddress: "456 Commerce Ave, City B",
    isDeliveryAvailable: false,
    deliveryFee: 0,
    deliveryNotes: "N/A",
    allergenInfo: "None",
    storageInfo: "Store in a cool dry place",
    isDonation: false,
    paymentMethods: ["CASH", "CARD"],
  },
];

export async function POST(req: Request) {
  console.log(req);
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

export async function GET(req: Request) {
  console.log(req);
  return NextResponse.json(dummyProducts);
}