import { Suspense } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import BuyProductsClient from "./BuyProductsClient";
import FlashSales from "./FlashSales";
import Loading from "./loading";
import { notFound } from "next/navigation";
import { FeaturedProducts } from "@/components/featured/FeaturedProducts";
import { CategoryShowcase } from "@/components/categories/CategoryShowcase";
import { SearchFilters } from "@/components/filters/SearchFilters";

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
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing Deals
          </h1>
          <p className="text-white/90 text-lg max-w-xl">
            Find great products at incredible prices. Support sustainability and
            save money.
          </p>
        </div>
      </section>

      <Suspense fallback={<Loading />}>
        {/* Timer and Featured */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CountdownTimer
              expiryDate={new Date(Date.now() + 7200 * 1000).toISOString()}
            />
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">{data.products.length}</p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{data.categories.length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <FeaturedProducts products={data.products} />

        {/* Search and Filters */}
        {/* <SearchFilters /> */}
        {/* Regular Products */}
        <BuyProductsClient
          products={data.products}
          categories={data.categories}
        />

        {/* Categories */}
        <CategoryShowcase categories={data.categories} />
      </Suspense>
    </div>
  );
}
