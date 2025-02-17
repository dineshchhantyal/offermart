import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="divide-y">
        {[1, 2].map((item) => (
          <div key={item} className="py-4 flex gap-4">
            <Skeleton className="w-24 h-24 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between mb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
    </Card>
  );
}
