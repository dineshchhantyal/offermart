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
import { Clock, MapPin, Package, ShoppingCart, Tag, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/features/cartSlice";
import { toast } from "sonner";

interface ProductViewProps {
  product: ProductWithDetails;
}

export function ProductView({ product }: ProductViewProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    // Create a new object with serialized dates
    const serializedProduct: ProductWithDetails = {
      ...product,
      seller: {
        id: product.seller.id,
        name: product.seller.name,
        image: product.seller.image,
      },
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      images: product.images,
    };

    dispatch(addItem(serializedProduct));
    toast.success("Added to cart");
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6">
      {/* Breadcrumb - Hide on mobile */}
      <nav className="hidden mb-6 sm:flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Home</span>
        <span>/</span>
        <span>{product.category.name}</span>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-y-4 lg:gap-x-8 lg:gap-y-6 lg:grid-cols-2">
        {/* Left Column - Images */}
        <div className="lg:sticky lg:top-6">
          <ImageCarousel
            images={product.images.map((image) => ({
              id: image.id,
              url: image.url,
              alt: product.title,
            }))}
          />
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant={getStatusVariant(product.status)}>
                {product.status}
              </Badge>
              {product.isDonation && (
                <Badge variant="secondary">Donation</Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>
            <p className="text-sm text-muted-foreground">
              {product.category.name}
            </p>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.discountedPrice && (
                <span className="text-base sm:text-lg text-muted-foreground line-through">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              value={
                product.expiryDate
                  ? format(new Date(product.expiryDate), "MMM d, yyyy")
                  : "Not specified"
              }
            />
            <InfoCard
              icon={<Truck className="h-4 w-4" />}
              label="Delivery"
              value={product.isDeliveryAvailable ? "Available" : "Pickup Only"}
            />
          </div>

          {/* Description - Collapsible on mobile */}
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="prose prose-sm max-h-32 sm:max-h-none overflow-y-auto">
                <p className="text-sm leading-relaxed">{product.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{product.pickupAddress}</span>
          </div>

          {/* Seller Info */}
          <Card>
            <CardContent className="flex items-center justify-between p-4 sm:pt-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                  <AvatarImage src={product.seller.image || undefined} />
                  <AvatarFallback>
                    {getInitials(product.seller.name || "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium line-clamp-1">
                    {product.seller.name}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Seller
                  </p>
                </div>
              </div>

              {product.sellerId && (
                <Button
                  size="sm"
                  variant="outline"
                  className="hidden sm:inline-flex"
                  onClick={() => router.push(`/seller/${product?.sellerId}`)}
                >
                  View Profile
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Actions - Fixed to bottom on mobile */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t lg:relative lg:p-0 lg:border-0">
            <div className="flex gap-3 max-w-lg mx-auto lg:max-w-none">
              {!product.isDonation && (
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
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
          </div>

          {/* Additional Details - Accordion on mobile */}
          <div className="space-y-4 text-sm pb-20 lg:pb-0">
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
