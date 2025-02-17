import { Skeleton } from "@/components/ui/skeleton";

export default function BuyPageLoading() {
  return (
    <div className="space-y-8 p-4">
      {/* Countdown Skeleton */}
      <div className="w-full max-w-md mx-auto">
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Categories Skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 flex-shrink-0" />
        ))}
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
