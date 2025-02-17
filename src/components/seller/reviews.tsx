"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface SellerReviewsProps {
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    reviewer: {
      name: string | null;
      image: string | null;
    };
  }>;
}

export function SellerReviews({ reviews }: SellerReviewsProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="p-4 rounded-lg border">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={review.reviewer.image || undefined} />
                <AvatarFallback>
                  {review.reviewer.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {review.reviewer.name || "Anonymous"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
