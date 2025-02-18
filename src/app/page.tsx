import { Suspense } from "react";
import { HeroSection } from "@/components/sections/hero";
import { ImpactSection } from "@/components/sections/impact";
import { MissionSection } from "@/components/sections/mission";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta";
import { FeaturesSection } from "@/components/sections/features";
import { FeaturedProducts } from "@/components/featured/FeaturedProducts";
import LoadingListings from "./sell/listings/loading";

async function fetchProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/new`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const { data: products } = await res.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen">
      {/* Hero Section with Parallax */}
      <div className="relative">
        <HeroSection />
      </div>

      {/* Featured Products Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <Suspense fallback={<LoadingListings />}>
            <FeaturedProducts products={products} />
          </Suspense>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <FeaturesSection />

      {/* Impact Section with Counter Animation */}
      <ImpactSection />

      {/* Mission Section with Parallax Images */}
      <div className="relative overflow-hidden">
        <MissionSection />
      </div>

      {/* Testimonials with Carousel */}
      <div className="relative">
        <TestimonialsSection />
      </div>

      {/* CTA Section with Floating Elements */}
      <div className="relative overflow-hidden">
        <CtaSection />
      </div>
    </main>
  );
}
