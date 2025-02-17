"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export function OrderSummary() {
  const { items } = useSelector((state: RootState) => state.cart);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(itemsBySeller).map(([sellerId, { seller, items }]) => (
          <div key={sellerId}>
            <h3 className="font-semibold mb-4">{seller.name}</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">
                      {item.product.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      $
                      {formatPrice(
                        item.product.discountedPrice * item.quantity
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
          </div>
        ))}

        <div className="space-y-2">
          {Object.entries(itemsBySeller).map(
            ([sellerId, { seller, total }]) => (
              <div key={sellerId} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({seller.name})
                </span>
                <span>${formatPrice(total)}</span>
              </div>
            )
          )}
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span>${formatPrice(totalAmount)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
