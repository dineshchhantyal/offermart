import { CountdownTimer } from "@/components/CountdownTimer";
import BuyProductsClient from "./BuyProductsClient";
import FlashSales from "./FlashSales";

export default async function BuyPage() {
  // Fetch both products and categories in parallel
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/new`, {
      cache: "no-cache",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
      cache: "no-cache",
    }),
  ]);

  const [{ data: products }, { categories }] = await Promise.all([
    productsRes.json(),
    categoriesRes.json(),
  ]);

  return (
    <div className="space-y-8 p-4">
      <CountdownTimer
        expiryDate={new Date(Date.now() + 7200 * 1000).toISOString()}
      />

      {/* Regular Products Section */}
      <BuyProductsClient products={products} categories={categories} />
      {/* Flash Sales Section */}
      <FlashSales products={products} />
    </div>
  );
}
