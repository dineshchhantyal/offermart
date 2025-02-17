import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { formatDate } from "@/lib/utils";

const statusConfig = {
  PENDING: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
  PROCESSING: { color: "bg-blue-100 text-blue-800", icon: Package },
  SHIPPED: { color: "bg-purple-100 text-purple-800", icon: Truck },
  DELIVERED: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  CANCELLED: { color: "bg-red-100 text-red-800", icon: XCircle },
};

export default async function OrdersPage() {
  const user = await currentUser();
  if (!user) redirect("/auth/login");

  const orders = await db.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No orders
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order #{order.id.slice(-8)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Badge className={statusConfig[order.status].color}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {order.status}
                  </Badge>
                </div>

                <div className="divide-y">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4">
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.product.images[0]?.url}
                          alt={item.product.title}
                          className="object-cover rounded"
                          width={96}
                          height={96}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.title}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Shipped to: {order.shippingAddress}, {order.city},{" "}
                    {order.state} {order.zipCode}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
