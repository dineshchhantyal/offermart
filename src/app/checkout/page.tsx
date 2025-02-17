"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/redux/features/cartSlice";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace("/cart");
      toast.error("Your cart is empty");
    }
  }, []);

  if (cartItems.length === 0) {
    return null;
  }

  return <CheckoutForm />;
}
