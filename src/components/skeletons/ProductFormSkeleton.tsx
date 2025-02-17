import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductFormSkeleton() {
  return (
    <Card className="p-6 space-y-8">
      {/* Progress bar skeleton */}
      <div className="relative mb-8">
        <Skeleton className="h-1 w-full mb-4" />
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-16 mt-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Form fields skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}

        {/* Image upload skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>

        {/* Rich text editor skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Action buttons skeleton */}
        <div className="flex justify-between pt-6">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </Card>
  );
}
