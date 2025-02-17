"use client";

import { Category } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categoryImages: Record<string, string> = {
  Groceries: "/categories/groceries.jpg",
  Electronics: "/categories/electronics.jpg",
  // Add more category images
};

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            <Link href={`/category/${category.id}`}>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={
                    categoryImages[category.name] || "/categories/default.jpg"
                  }
                  alt={category.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                <h3 className="absolute bottom-4 left-4 text-white font-semibold text-xl">
                  {category.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
