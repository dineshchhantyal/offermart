"use client";

import { Category } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBasket,
  Laptop,
  Shirt,
  Baby,
  Home,
  Gift,
  Book,
  Dumbbell,
  Pizza,
  Car,
  Heart,
  LucideIcon,
  Package,
} from "lucide-react";

interface CategoryDetail {
  image: string;
  icon: LucideIcon;
  color: string;
}

const categoryDetails: Record<string, CategoryDetail> = {
  Groceries: {
    image: "/categories/groceries.jpg",
    icon: ShoppingBasket,
    color: "text-green-500",
  },
  Electronics: {
    image: "/categories/electronics.jpg",
    icon: Laptop,
    color: "text-blue-500",
  },
  Fashion: {
    image: "/categories/fashion.jpg",
    icon: Shirt,
    color: "text-purple-500",
  },
  "Baby & Kids": {
    image: "/categories/baby.jpg",
    icon: Baby,
    color: "text-pink-500",
  },
  "Home & Living": {
    image: "/categories/home.jpg",
    icon: Home,
    color: "text-amber-500",
  },
  Gifts: {
    image: "/categories/gifts.jpg",
    icon: Gift,
    color: "text-red-500",
  },
  Books: {
    image: "/categories/books.jpg",
    icon: Book,
    color: "text-yellow-500",
  },
  Sports: {
    image: "/categories/sports.jpg",
    icon: Dumbbell,
    color: "text-indigo-500",
  },
  "Food & Beverages": {
    image: "/categories/food.jpg",
    icon: Pizza,
    color: "text-orange-500",
  },
  Automotive: {
    image: "/categories/automotive.jpg",
    icon: Car,
    color: "text-slate-500",
  },
  Health: {
    image: "/categories/health.jpg",
    icon: Heart,
    color: "text-rose-500",
  },
};

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, i) => {
          const details = categoryDetails[category.name] || {
            image: "/categories/default.jpg",
            icon: Package,
            color: "text-gray-500",
          };
          const Icon = details.icon;

          return (
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
                    src={details.image}
                    alt={category.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className={`w-12 h-12 ${details.color} mb-2`} />
                    <h3 className="text-white font-semibold text-xl text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
