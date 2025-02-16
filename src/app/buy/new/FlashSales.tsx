"use client";
import React from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProductCard } from "@/components/ProductCard";
import { ProductWithDetails } from "@/types/product";

interface FlashSaleProduct {
  products: ProductWithDetails[];
}

const FlashSales: React.FC<FlashSaleProduct> = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">🔥 Flash Sales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative">
            {product.expiryDate && (
              <CountdownTimer
                expiryDate={new Date(
                  Date.now() +
                    Math.floor(Math.random() * (10 - 2 + 1) + 2) *
                      60 *
                      60 *
                      1000
                ).toISOString()}
              />
            )}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSales;
