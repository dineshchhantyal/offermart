import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";
import { currentUser } from "@/lib/auth";

const reviewSchema = z.object({
  sellerId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const session = await currentUser();
    if (!session?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = reviewSchema.parse(json);

    const existingReview = await db.review.findFirst({
      where: {
        sellerId: body.sellerId,
        reviewerId: session.id,
      },
    });

    if (existingReview) {
      return new NextResponse("You have already reviewed this seller", {
        status: 400,
      });
    }

    const review = await db.review.create({
      data: {
        sellerId: body.sellerId,
        reviewerId: session.id,
        rating: body.rating,
        comment: body.comment,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("[REVIEWS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
