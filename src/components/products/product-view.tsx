"use client";

import { format } from "date-fns";
import { ProductWithDetails } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Clock, MapPin, Package, Tag, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductViewProps {
  product: ProductWithDetails;
}

export function ProductView({ product }: ProductViewProps) {
  const router = useRouter();
  return (
    <div className="container mx-auto py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Home</span>
        <span>/</span>
        <span>{product.category.name}</span>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
        {/* Left Column - Images */}
        <div className="sticky top-6">
          <ImageCarousel
            images={product.images.map((image) => ({
              id: image.id,
              url: image.url,
              alt: product.title,
            }))}
          />
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between">
              <Badge
                variant={getStatusVariant(product.status)}
                className="mb-2"
              >
                {product.status}
              </Badge>
              {product.isDonation && (
                <Badge variant="secondary">Donation</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-muted-foreground">{product.category.name}</p>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.discountedPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
            {product.discountedPrice && (
              <Badge variant="secondary">
                Save $
                {((product.originalPrice ?? 0) - product.price).toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              icon={<Tag className="h-4 w-4" />}
              label="Condition"
              value={product.condition}
            />
            <InfoCard
              icon={<Package className="h-4 w-4" />}
              label="Quantity"
              value={`${product.quantity} ${product.unit}`}
            />
            <InfoCard
              icon={<Clock className="h-4 w-4" />}
              label="Expires"
              value={format(new Date(product.expiryDate), "MMM d, yyyy")}
            />
            <InfoCard
              icon={<Truck className="h-4 w-4" />}
              label="Delivery"
              value={product.isDeliveryAvailable ? "Available" : "Pickup Only"}
            />
          </div>

          {/* Description */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>

          {/* Location */}
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{product.pickupAddress}</span>
          </div>

          {/* Seller Info */}
          <Card>
            <CardContent className="flex items-center justify-between pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={product.seller.image || undefined} />
                  <AvatarFallback>
                    {getInitials(product.seller.name || "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{product.seller.name}</p>
                  <p className="text-sm text-muted-foreground">Seller</p>
                </div>
              </div>

              {product.sellerId && (
                <Button
                  onClick={() => router.push(`/seller/${product?.sellerId}`)}
                >
                  View Profile
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            {!product.isDonation && (
              <Button size="lg" className="flex-1">
                Buy
              </Button>
            )}
            <Button
              size="lg"
              variant="secondary"
              className="flex-1"
              onClick={() => router.push(`/seller/${product?.sellerId}`)}
            >
              Contact Seller
            </Button>
          </div>

          {/* Additional Details */}
          <div className="space-y-4 text-sm">
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Payment Methods</p>
                <p className="text-muted-foreground">
                  {product?.paymentMethods
                    ?.map(
                      (method) =>
                        method.charAt(0).toUpperCase() +
                        method.slice(1).toLowerCase().replace("_", " ")
                    )
                    .join(", ")}
                </p>
              </div>
              <div>
                <p className="font-medium">Best Before</p>
                <p className="text-muted-foreground">
                  {product.bestBefore
                    ? format(new Date(product.bestBefore), "MMM d, yyyy")
                    : "Not specified"}
                </p>
              </div>
              <div>
                <p className="font-medium">Brand</p>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
              <div>
                <p className="font-medium">Manufactured</p>
                <p className="text-muted-foreground">
                  {product.manufacturerDate
                    ? format(new Date(product.manufacturerDate), "MMM d, yyyy")
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center space-x-3 pt-4">
        {icon}
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" {
  switch (status.toLowerCase()) {
    case "pending":
      return "secondary";
    case "approved":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "default";
  }
}
