"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { redirect } from "next/navigation";

export default function CheckoutPage() {
  const { items } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CheckoutForm />
        <OrderSummary />
      </div>
    </div>
  );
}
