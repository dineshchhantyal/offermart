import { CountdownTimer } from "@/components/CountdownTimer";
import BuyProductsClient from "./BuyProductsClient";
import FlashSales from "./FlashSales";

export default async function BuyPage() {
  // Fetch verified products from our API route
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/new`,
    {
      cache: "no-cache",
    }
  );
  const { data: products } = await res.json();

  return (
    <div className="space-y-8 p-4">
      <CountdownTimer
        expiryDate={new Date(Date.now() + 7200 * 1000).toISOString()}
      />

      {/* Regular Products Section */}
      <BuyProductsClient products={products} />
      {/* Flash Sales Section */}
      <FlashSales products={products} />
    </div>
  );
}
