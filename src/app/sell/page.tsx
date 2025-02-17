import { Suspense } from "react";
import { ProductForm } from "@/components/products/product-form";
import { ProductFormSkeleton } from "@/components/skeletons/ProductFormSkeleton";

export default function SellPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">List Your Product</h1>
      <Suspense fallback={<ProductFormSkeleton />}>
        <ProductForm />
      </Suspense>
    </div>
  );
}
