"use client";

import { useSelector, useDispatch } from "react-redux";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

import { RootState } from "@/redux/store";
import {
  removeItem,
  updateQuantity,
  toggleCart,
  clearCart,
} from "@/redux/features/cartSlice";
import { formatPrice } from "@/lib/utils";

export function CartView() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

  // Group items by seller
  const itemsBySeller = items.reduce(
    (acc, item) => {
      const sellerId = item.product.sellerId;
      if (!acc[sellerId]) {
        acc[sellerId] = {
          seller: item.product.seller,
          items: [],
          total: 0,
        };
      }
      acc[sellerId].items.push(item);
      acc[sellerId].total += item.product.discountedPrice * item.quantity;
      return acc;
    },
    {} as Record<
      string,
      {
        seller: {
          id: string;
          name: string | null;
          image: string | null;
        };
        items: typeof items;
        total: number;
      }
    >
  );

  const totalAmount = Object.values(itemsBySeller).reduce(
    (sum, { total }) => sum + total,
    0
  );

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={() => dispatch(toggleCart())}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => dispatch(toggleCart())}
            >
              Continue Shopping
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(toggleCart())}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <SheetTitle>Your Cart ({items.length} items)</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </div>
          <Separator />
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 py-6">
            {Object.entries(itemsBySeller).map(
              ([sellerId, { seller, items }]) => (
                <div key={sellerId} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/seller/${sellerId}`}
                      className="flex items-center space-x-2 hover:underline"
                      onClick={() => dispatch(toggleCart())}
                    >
                      <h3 className="font-semibold">{seller.name}</h3>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-start space-x-4 bg-accent/50 p-4 rounded-lg"
                      >
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Link
                            href={`/products/${item.id}`}
                            className="font-medium hover:underline"
                            onClick={() => dispatch(toggleCart())}
                          >
                            {item.product.title}
                          </Link>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                              {item.product.condition}
                            </Badge>
                            {item.product.isDonation && (
                              <Badge variant="default">Donation</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
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
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span>{item.quantity}</span>
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
                                disabled={
                                  item.quantity >= item.product.quantity
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="text-sm font-medium">
                                {formatPrice(item.product.discountedPrice)}
                              </div>
                              {item.product.originalPrice && (
                                <div className="text-xs line-through text-muted-foreground">
                                  {formatPrice(item.product.originalPrice)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => dispatch(removeItem(item.id))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </ScrollArea>

        <div className="border-t pt-4 space-y-4">
          <div className="space-y-2">
            {Object.entries(itemsBySeller).map(
              ([sellerId, { seller, total }]) => (
                <div key={sellerId} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({seller.name})
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>
              )
            )}
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>
          <Button className="w-full" size="lg" asChild>
            <Link href="/checkout" onClick={() => dispatch(toggleCart())}>
              Proceed to Checkout ({formatPrice(totalAmount)})
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
