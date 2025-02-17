"use client";

import { ProductWithDetails } from "@/types/product";
import { motion } from "framer-motion";
import { ProductCard } from "../ProductCard";

export function FeaturedProducts({
  products,
}: {
  products: ProductWithDetails[];
}) {
  const featuredProducts = products
    .filter((p) => p.discountedPrice < p.originalPrice!)
    .sort(
      (a, b) =>
        b.originalPrice! -
        b.discountedPrice -
        (a.originalPrice! - a.discountedPrice)
    )
    .slice(0, 4);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Best Deals Today</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <ProductCard product={product} featured />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
