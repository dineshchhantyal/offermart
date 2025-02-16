import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        images: true,
        seller: true,
      },
      where: {
        status: "VERIFIED",
      }
    });

    return NextResponse.json({ data: products });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("[PRODUCTS_GET]", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

