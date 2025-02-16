"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductWithDetails } from "@/types/product";

interface BuyProductsClientProps {
  products: ProductWithDetails[];
}

const categories = ["All", "Electronics", "Fashion", "Home", "Toys"];

export default function BuyProductsClient({ products }: BuyProductsClientProps) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        categoryFilter === "All" || product.category.name === categoryFilter;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, categoryFilter, searchQuery]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Daily Movers</h1>
      
      {/* Filter Options */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                categoryFilter === cat ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-64"
        />
      </div>
      
      {/* Products Grid with proper grid sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}