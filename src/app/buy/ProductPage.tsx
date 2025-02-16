"use client";
import React, { useState, useEffect } from "react";
import { ProductCard, Product } from "../../components/ProductCard";
import { Button } from "../../components/ui/button";
import { Filter, X } from "lucide-react";
import { motion } from "framer-motion";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [maxDiscountedPrice, setMaxDiscountedPrice] = useState<number>(1000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [expiryDateFilter, setExpiryDateFilter] = useState<string>("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price <= maxPrice;
    const matchesDiscountedPrice =
      product.discountedPrice !== undefined ? product.discountedPrice <= maxDiscountedPrice : true;
    const matchesSearch = searchQuery
      ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesExpiryDate =
      expiryDateFilter === "" || new Date(product.expiryDate) <= new Date(expiryDateFilter);
  
    return matchesCategory && matchesPrice && matchesDiscountedPrice && matchesSearch && matchesExpiryDate;
  });
  
  // Handlers for filter side panel backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowFilterPanel(false);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="product-page p-4 relative">
      <h1 className="text-2xl font-bold mb-4">🔥 Today's Hot Deals</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-input placeholder:text-muted-foreground border border-border rounded p-2 focus:outline-none focus:ring-2 focus:ring-ring mb-4"
      />

      {/* Category Filters */}
      <div className="flex space-x-2 mb-4">
        {["Electronics", "Fashion", "Home", "Toys"].map((category) => (
          <Button
            key={category}
            onClick={() =>
              setSelectedCategories((prev) =>
                prev.includes(category)
                  ? prev.filter((c) => c !== category)
                  : [...prev, category]
              )
            }
            className={`px-4 py-2 rounded ${
              selectedCategories.includes(category)
                ? "text-white bg-blue-500"
                : "text-black bg-gray-200"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </motion.div>

      {/* Floating Filter Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowFilterPanel(true)}
        className="fixed bottom-4 right-4 bg-white shadow-lg rounded-full p-3 z-50"
      >
        <Filter className="w-6 h-6 text-gray-700" />
      </Button>

      {/* Filter Side Panel */}
      {showFilterPanel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[1000]"
          onClick={handleBackdropClick}
        >
          <div
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-[1010]"
            onClick={stopPropagation}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilterPanel(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Max Price Slider */}
            <div className="flex flex-col space-y-2 mb-4">
              <label className="font-semibold">
                Max Price: ${maxPrice}
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full bg-grey-200 rounded-full h-2 accent-green-600"
              />
            </div>

            {/* Max Discounted Price Slider */}
            <div className="flex flex-col space-y-2 mb-4">
              <label className="font-semibold">
                Max Discounted Price: ${maxDiscountedPrice}
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={maxDiscountedPrice}
                onChange={(e) => setMaxDiscountedPrice(Number(e.target.value))}
                className="w-full bg-grey-200 rounded-full h-2 accent-green-600"
              />
            </div>

            {/* Expiry Date Filter */}
<div className="flex flex-col space-y-2 mb-4">
  <label className="font-semibold">Expiry Date Before:</label>
  <input
    type="date"
    value={expiryDateFilter}
    onChange={(e) => setExpiryDateFilter(e.target.value)}
    className="w-full border accent-green-600 bg-green-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
  />
</div>


            {/* Additional filters can be added here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
