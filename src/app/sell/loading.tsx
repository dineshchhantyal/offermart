import { ProductFormSkeleton } from "@/components/skeletons/ProductFormSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSellPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Skeleton className="h-9 w-64 mb-8" />
      <ProductFormSkeleton />
    </div>
  );
}
