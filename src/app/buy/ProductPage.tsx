"use client";
import React, { useState, useEffect } from 'react';
import { ProductCard, Product } from '../../components/ProductCard';
import { Button } from '../../components/ui/button';
import { Filter, X } from 'lucide-react';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [expiryFilter, setExpiryFilter] = useState<string>("");

  // Toggle Filter Side Panel
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter products based on selected criteria
  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryFilter
      ? product.category.toLowerCase() === categoryFilter.toLowerCase()
      : true;
    const matchesExpiry = expiryFilter
      ? new Date(product.expiryDate) <= new Date(expiryFilter)
      : true;
    return matchesCategory && matchesExpiry;
  });

  // Handler to dismiss panel when clicking outside of it
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowFilterPanel(false);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="product-page p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Today's Deals</h1>
      {/* Navigation Filter Options */}
      <nav className="mb-4">
        <ul className="flex space-x-4">
          {["All", "Electronics", "Fashion"].map((cat) => (
            <li key={cat}>
              <Button
                variant="default"
                onClick={() => setCategoryFilter(cat === "All" ? "" : cat)}
                className={`px-4 py-2 rounded hover:shadow-xl transition-shadow duration-300 ${
                  (cat === "All" && categoryFilter === "") ||
                  categoryFilter.toLowerCase() === cat.toLowerCase()
                    ? "text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Products Grid */}
      <div className="product-grid flex flex-wrap gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Floating Filter Button */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setShowFilterPanel(true)}
        className="fixed bottom-4 right-4 shadow-lgbg-white rounded-full p-3"
      >
        <Filter className="w-6 h-6 text-gray-700" />
      </Button>

      {/* Filter Side Panel */}
      {showFilterPanel && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40" 
          onClick={handleBackdropClick}
        >
          <div 
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50" 
            onClick={stopPropagation}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="default" size="icon" onClick={() => setShowFilterPanel(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              {/* Expiry Date Filter */}
              <div className="flex flex-col">
                <label htmlFor="expiryFilter" className="mb-1 font-semibold text-gray-700">
                  Expiry Date Before
                </label>
                <input
                  id="expiryFilter"
                  type="date"
                  value={expiryFilter}
                  onChange={(e) => setExpiryFilter(e.target.value)}
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Additional filters can be added here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;