"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";

export function CartButton() {
  const dispatch = useDispatch();
  const itemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={() => dispatch(toggleCart())}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
