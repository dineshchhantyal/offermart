import { ProductFormSkeleton } from "@/components/skeletons/ProductFormSkeleton";

export default function LoadingSellPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Skeleton className="h-9 w-64 mb-8" />
      <ProductFormSkeleton />
    </div>
  );
}
