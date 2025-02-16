import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyExpiryDate } from "@/lib/ai/verify-expiry";
import { auth } from "../../../../auth";

const dummyProducts = [
  {
    id: '1',
    title: 'Mega Deal: Product 1',
    description: 'Enjoy an exclusive discount on Product 1!',
    brand: 'Brand A',
    categoryId: 'cat1',
    price: 100,
    discountedPrice: 80,
    expiryDate: new Date().toISOString(),
    size: 'Medium',
    isDonation: false,
    commission: 0.1,
    status: 'AVAILABLE',
    quantity: 50,
    unit: 'pieces',
    pickupAddress: '123 Market St, City A',
    isDeliveryAvailable: true,
    deliveryFee: 5,
    paymentMethods: ['Credit Card', 'PayPal'],
    condition: 'NEW',
    originalPrice: 120,
    manufacturerDate: new Date().toISOString(),
    bestBefore: new Date().toISOString(),
    allergenInfo: 'None',
    storageInfo: 'Keep in a cool, dry place',
    images: [{ url: 'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }],
    sellerId: 'seller1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Hot Deal: Product 2',
    description: 'Grab the deal before it expires!',
    brand: 'Brand B',
    image : 'https://via.placeholder.com/300x500',
    categoryId: 'cat2',
    price: 200,
    discountedPrice: 150,
    expiryDate: new Date().toISOString(),
    size: 'Large',
    isDonation: false,
    commission: 0.1,
    status: 'AVAILABLE',
    quantity: 30,
    unit: 'kg',
    pickupAddress: '456 Commerce Ave, City B',
    isDeliveryAvailable: false,
    deliveryFee: 0,
    paymentMethods: ['Cash', 'Credit Card'],
    condition: 'USED',
    originalPrice: 250,
    manufacturerDate: new Date().toISOString(),
    bestBefore: new Date().toISOString(),
    allergenInfo: 'None',
    storageInfo: 'Store in a ventilated area',
    images: [{ url: 'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }],
    sellerId: 'seller2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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