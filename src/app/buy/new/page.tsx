import { Suspense } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import BuyProductsClient from "./BuyProductsClient";
import FlashSales from "./FlashSales";
import Loading from "./loading";
import { notFound } from "next/navigation";

async function fetchData() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/new`, {
        cache: "no-cache",
      }),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
        cache: "no-cache",
      }),
    ]);

    if (!productsRes.ok || !categoriesRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const [{ data: products }, { categories }] = await Promise.all([
      productsRes.json(),
      categoriesRes.json(),
    ]);

    return { products, categories };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function BuyPage() {
  const data = await fetchData();

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-8 p-4">
      <Suspense fallback={<Loading />}>
        <CountdownTimer
          expiryDate={new Date(Date.now() + 7200 * 1000).toISOString()}
        />

        {/* Regular Products Section */}
        <BuyProductsClient
          products={data.products}
          categories={data.categories}
        />

        {/* Flash Sales Section */}
        <FlashSales products={data.products} />
      </Suspense>
    </div>
  );
}
