"use client";
import React from "react";
import { CountdownTimer } from "@/components/CountdownTimer";

interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  discountedPrice: number;
  expiryDate: string;
  category: string;
  images?: { url: string }[];
  description: string;
  originalPrice: number;
  quantity: number;
  unit: string;
  condition: string;
  manufacturerDate: string;
  pickupAddress: string;
  isDeliveryAvailable: boolean;
  deliveryCharge: number;
  isDonation: boolean;
  paymentMethods: string[];
}

const dummyFlashSaleProducts: Product[] = [
  {
    id: "1",
    title: "Flash Sale Product 1",
    brand: "Brand A",
    price: 200,
    discountedPrice: 50,
    expiryDate: new Date(Date.now() + 3600 * 1000).toISOString(), // expires in 1 hour
    category: "Electronics",
    condition: "New",
    manufacturerDate: new Date().toISOString(),
    pickupAddress: "123 Main St",
    isDeliveryAvailable: true,
    deliveryCharge: 5,
    description: "Description for Flash Sale Product 1",
    originalPrice: 250,
    quantity: 10,
    unit: "pcs",
    isDonation: false,
    paymentMethods: ["Credit Card", "PayPal"],
    images: [{ url: "https://via.placeholder.com/300x224" }],
  },
  {
    id: "2",
    title: "Flash Sale Product 2",
    brand: "Brand B",
    price: 150,
    discountedPrice: 30,
    expiryDate: new Date(Date.now() + 7200 * 1000).toISOString(), // expires in 2 hours
    category: "Fashion",
    condition: "New",
    manufacturerDate: new Date().toISOString(),
    pickupAddress: "456 Main St",
    isDeliveryAvailable: false,
    deliveryCharge: 0,
    description: "Description for Flash Sale Product 2",
    originalPrice: 180,
    quantity: 5,
    unit: "pcs",
    isDonation: false,
    paymentMethods: ["Debit Card"],
    images: [{ url: "https://via.placeholder.com/300x224" }],
  },
  {
    id: "3",
    title: "Flash Sale Product 3",
    brand: "Brand C",
    price: 300,
    discountedPrice: 100,
    expiryDate: new Date(Date.now() + 1800 * 1000).toISOString(), // expires in 30 mins
    category: "Home",
    condition: "New",
    manufacturerDate: new Date().toISOString(),
    pickupAddress: "789 Main St",
    isDeliveryAvailable: true,
    deliveryCharge: 10,
    description: "Description for Flash Sale Product 3",
    originalPrice: 350,
    quantity: 20,
    unit: "pcs",
    isDonation: false,
    paymentMethods: ["Credit Card", "Cash"],
    images: [{ url: "https://via.placeholder.com/300x224" }],
  },
];

const FlashSales: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🔥 Flash Sales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyFlashSaleProducts.map((product) => (
          <div key={product.id} className="relative">
            <CountdownTimer expiryDate={product.expiryDate} />
            {/* <ProductCard product={product} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSales;