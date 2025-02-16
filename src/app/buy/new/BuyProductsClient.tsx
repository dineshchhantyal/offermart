"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductWithDetails } from "@/types/product";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface BuyProductsClientProps {
  products: ProductWithDetails[];
}

const categories = ["All", "Electronics", "Fashion", "Home", "Toys"];

export default function BuyProductsClient({
  products,
}: BuyProductsClientProps) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        categoryFilter === "All" || product.category.name === categoryFilter;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, categoryFilter, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Daily Movers
        </h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </div>

      {/* Categories ScrollArea */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 pb-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? "default" : "outline"}
              onClick={() => setCategoryFilter(cat)}
              className="min-w-[80px]"
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
