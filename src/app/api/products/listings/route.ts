import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

export async function GET() {
  try {
    const session = await currentUser();

    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await db.product.findMany({
      where: {
        sellerId: session.id,
      },
      include: {
        category: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: products });
  } catch (error) {
    console.error("[PRODUCTS_LISTINGS_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
