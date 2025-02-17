import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      categories: [{ id: "all", name: "All" }, ...categories],
    });
  } catch (error) {
    console.error("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
