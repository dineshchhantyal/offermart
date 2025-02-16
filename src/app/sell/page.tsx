import { ProductForm } from "@/components/products/product-form";

export default function SellPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">List Your Product</h1>
      <ProductForm />
    </div>
  );
}
