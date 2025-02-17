"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeItem,
  updateQuantity,
  toggleCart,
} from "@/redux/features/cartSlice";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export function Cart() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.sellerId]) {
      acc[item.sellerId] = [];
    }
    acc[item.sellerId].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const totalAmount = items.reduce(
    (total, item) =>
      total + (item.product.discountedPrice ?? 0) * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(toggleCart())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {Object.entries(groupedItems).map(([sellerId, sellerItems]) => (
              <div
                key={sellerId}
                className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <Link
                  href={`/seller/${sellerId}`}
                  className="font-semibold hover:underline mb-2 block"
                >
                  {sellerItems[0].product.seller.name}
                </Link>
                <div className="space-y-4">
                  {sellerItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-white dark:bg-gray-900 p-3 rounded-md"
                    >
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.product.discountedPrice}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 ml-auto"
                            onClick={() => dispatch(removeItem(item.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${formatPrice(totalAmount)}</span>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
