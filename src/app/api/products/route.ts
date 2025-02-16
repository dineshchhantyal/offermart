import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { PaymentMethodType, ProductStatus } from "@prisma/client";
import { currentUser } from "@/lib/auth";

const dummyProducts = [
  {
    id: "3",
    title: "Organic Honey",
    description: "Natural and unprocessed honey harvested from organic farms.",
    brand: "Nature's Nectar",
    categoryId: "cat3",
    price: 15,
    discountedPrice: 12,
    expiryDate: new Date("2025-12-31").toISOString(),
    size: "500g",
    isDonation: false,
    commission: 0.1,
    status: "AVAILABLE",
    quantity: 100,
    unit: "jars",
    pickupAddress: "789 Honey Lane, City C",
    isDeliveryAvailable: true,
    deliveryFee: 5,
    paymentMethods: ["Credit Card", "PayPal"],
    condition: "NEW",
    originalPrice: 18,
    manufacturerDate: new Date("2024-06-01").toISOString(),
    bestBefore: new Date("2025-12-31").toISOString(),
    allergenInfo: "May contain pollen",
    storageInfo: "Keep in a cool, dry place",
    images: [
      {
        url: "https://www.walmart.com/ip/Y-S-Eco-Bee-Farms-100-Certified-Organic-Raw-Honey-1-lb-454-grams-Paste-3/558971630",
      },
    ],
    sellerId: "seller3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Extra Strength Pain Relief Tablets",
    description: "Effective relief from headaches, muscle aches, and arthritis.",
    brand: "Medi-First",
    categoryId: "cat4",
    price: 10,
    discountedPrice: 8,
    expiryDate: new Date("2024-08-15").toISOString(),
    size: "100 tablets per box",
    isDonation: false,
    commission: 0.1,
    status: "AVAILABLE",
    quantity: 200,
    unit: "boxes",
    pickupAddress: "123 Pharmacy Blvd, City D",
    isDeliveryAvailable: false,
    deliveryFee: 0,
    paymentMethods: ["Cash", "Credit Card"],
    condition: "NEW",
    originalPrice: 12,
    manufacturerDate: new Date("2023-12-01").toISOString(),
    bestBefore: new Date("2024-08-15").toISOString(),
    allergenInfo: "None",
    storageInfo: "Store in a cool, dry place",
    images: [
      {
        url: "https://www.webstaurantstore.com/medi-first-pain-relief-tablets-pain-reliever-100-box/57781133.html",
      },
    ],
    sellerId: "seller4",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Organic Honey",
    description: "Pure, unprocessed honey sourced from organic beehives.",
    brand: "Nature's Best",
    categoryId: "cat3",
    price: 18,
    discountedPrice: 15,
    expiryDate: new Date("2025-11-30").toISOString(),
    size: "500g",
    isDonation: false,
    commission: 0.1,
    status: "AVAILABLE",
    quantity: 120,
    unit: "jars",
    pickupAddress: "321 Honeycomb Rd, City F",
    isDeliveryAvailable: true,
    deliveryFee: 6,
    paymentMethods: ["Credit Card", "PayPal"],
    condition: "NEW",
    originalPrice: 20,
    manufacturerDate: new Date("2024-05-01").toISOString(),
    bestBefore: new Date("2025-11-30").toISOString(),
    allergenInfo: "May contain traces of pollen",
    storageInfo: "Store in a cool, dry place",
    images: [
      {
        url: "https://source.unsplash.com/random/300x300/?honey,bee",
      },
    ],
    sellerId: "seller6",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Revitalizing Luxury Face Cream",
    description: "Premium face cream that nourishes and rejuvenates the skin.",
    brand: "Elegance",
    categoryId: "cat5",
    price: 80,
    discountedPrice: 70,
    expiryDate: new Date("2025-05-20").toISOString(),
    size: "50ml",
    isDonation: false,
    commission: 0.1,
    status: "AVAILABLE",
    quantity: 75,
    unit: "jars",
    pickupAddress: "456 Beauty Ave, City E",
    isDeliveryAvailable: true,
    deliveryFee: 7,
    paymentMethods: ["Credit Card", "PayPal"],
    condition: "NEW",
    originalPrice: 90,
    manufacturerDate: new Date("2024-01-10").toISOString(),
    bestBefore: new Date("2025-05-20").toISOString(),
    allergenInfo: "Contains essential oils",
    storageInfo: "Store in a cool, dry place away from sunlight",
    images: [
      {
        url: "https://example.com/luxury-face-cream.jpg",
      },
    ],
    sellerId: "seller5",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Extra Strength Pain Relief Tablets",
    description: "Fast-acting relief for headaches, muscle aches, and joint pain.",
    brand: "ReliefPro",
    categoryId: "cat4",
    price: 12,
    discountedPrice: 10,
    expiryDate: new Date("2024-09-30").toISOString(),
    size: "100 tablets per box",
    isDonation: false,
    commission: 0.1,
    status: "AVAILABLE",
    quantity: 150,
    unit: "boxes",
    pickupAddress: "456 Painfree St, City G",
    isDeliveryAvailable: true,
    deliveryFee: 5,
    paymentMethods: ["Credit Card", "Cash"],
    condition: "NEW",
    originalPrice: 14,
    manufacturerDate: new Date("2023-11-01").toISOString(),
    bestBefore: new Date("2024-09-30").toISOString(),
    allergenInfo: "None",
    storageInfo: "Store in a cool, dry place",
    images: [
      {
        url: "https://source.unsplash.com/random/300x300/?medicine,pills",
      },
    ],
    sellerId: "seller7",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

];




export async function POST(req: Request) {
  try {
    const session = await currentUser();
    const body = await req.json();

    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create product with proper connections
    const product = await db.product.create({
      data: {
        title: body.title,
        description: body.description,
        brand: body.brand,
        category: {
          connectOrCreate: {
            where: { name: body.category },
            create: { name: body.category },
          },
        },
        seller: {
          connect: {
            id: session.id,
          },
        },
        images: {
          create: body.images.map((url: string) => ({
            url,
          })),
        },
        originalPrice: body.originalPrice,
        price: body.price,
        discountedPrice: body.discountedPrice,
        quantity: body.quantity,
        unit: body.unit,
        condition: body.condition,
        manufacturerDate: new Date(body.manufacturerDate),
        expiryDate: new Date(body.expiryDate),
        bestBefore: body.bestBefore ? new Date(body.bestBefore) : null,
        pickupAddress: body.pickupAddress,
        isDeliveryAvailable: body.isDeliveryAvailable,
        isDonation: body.isDonation,
        commission: body.commission,
        status: body.status as ProductStatus,
        // Correctly handle payment methods as enum array
        paymentMethods: body.paymentMethods.map(
          (method: string) => method.toUpperCase() as PaymentMethodType
        ),
      },
      include: {
        seller: true,
        category: true,
        images: true,
      },
    });

    return NextResponse.json({ data: product });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("[PRODUCTS_POST]", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ data: dummyProducts });
}


