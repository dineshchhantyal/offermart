"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ReviewForm } from "./review-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SellerReviewsProps {
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    reviewer: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }>;
  sellerId: string;
  currentUserId?: string;
}

export function SellerReviews({
  reviews,
  sellerId,
  currentUserId,
}: SellerReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const hasReviewed = reviews.some(
    (review) => review.reviewer.id === currentUserId
  );

  return (
    <div className="space-y-6">
      {currentUserId && !hasReviewed && sellerId !== currentUserId && (
        <div className="mb-8">
          {showReviewForm ? (
            <ReviewForm
              sellerId={sellerId}
              onSuccess={() => setShowReviewForm(false)}
              onCancel={() => setShowReviewForm(false)}
            />
          ) : (
            <Button
              onClick={() => setShowReviewForm(true)}
              className="w-full sm:w-auto"
            >
              Write a Review
            </Button>
          )}
        </div>
      )}

      {/* Review Statistics */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Rating Overview</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {(
                  reviews.reduce((acc, r) => acc + r.rating, 0) /
                    reviews.length || 0
                ).toFixed(1)}
              </span>
              <span className="text-muted-foreground">out of 5</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {reviews.length} reviews
            </p>
          </div>
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100 || 0;
              return (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-20">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{rating}</span>
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-lg border bg-white dark:bg-gray-800/50 hover:shadow-md transition-shadow"
          >
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
    </div>
  );
}
