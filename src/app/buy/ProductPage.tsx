"use client";
import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard';

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  image: string;
  categoryId: string;
  category: string;
  price: number;
  discountedPrice: number;
  expiryDate: string;
  size?: string;
  isDonation: boolean;
  commission: number;
  status: string;
  quantity: number;
  unit: string;
  pickupAddress: string;
  isDeliveryAvailable: boolean;
  deliveryFee?: number;
  paymentMethods: string[];
  condition: string;
  originalPrice?: number;
  manufacturerDate?: string;
  bestBefore?: string;
  allergenInfo?: string;
  storageInfo?: string;
  images: { url: string }[];
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(res);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-page">
      <h1>Today&apos;s Deals</h1>
      <div
        className="product-grid"
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;