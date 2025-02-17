"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  ShoppingCart,
  Star,
  Clock,
  TrendingUp,
  BadgePercent,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ProductWithDetails } from "@/types/product";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: ProductWithDetails;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  featured = false,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const discount = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addItem(product));
    toast.success("Added to cart");
  };

  const daysUntilExpiry = Math.ceil(
    (new Date(product.expiryDate).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24)
  );

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border border-gray-200 transition-all duration-300",
        featured
          ? "w-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          : "w-[300px] shadow-md hover:shadow-xl"
      )}
    >
      <figure className="relative">
        {product.images?.length >= 1 && (
          <Image
            className={cn(
              "w-full object-cover transition-transform duration-300 group-hover:scale-105",
              featured ? "h-72" : "h-56"
            )}
            src={product.images[0].url}
            width={featured ? 400 : 300}
            height={featured ? 288 : 224}
            alt={product.title}
            priority={featured}
          />
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            -{discount}%
          </div>
        )}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-2 right-12 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4" /> Featured
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 rounded-full shadow-sm hover:bg-white/90"
        >
          <HeartIcon className="w-5 h-5 text-red-500" />
        </Button>

        {/* Expiry Badge for items expiring soon */}
        {daysUntilExpiry <= 7 && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Expires in {daysUntilExpiry} days
          </div>
        )}
      </figure>

      <CardContent className={cn("p-4", featured && "space-y-2")}>
        <div className="flex justify-between">
          <div className="flex flex-col space-y-1">
            <h3
              className={cn(
                "font-semibold line-clamp-2",
                featured ? "text-xl" : "text-lg"
              )}
            >
              <Link
                href={`/products/${encodeURIComponent(product.id)}`}
                className="hover:underline"
              >
                {product.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <p className="text-xs text-gray-500">
              Expires: {new Date(product.expiryDate).toLocaleDateString()}
            </p>
            <div className="flex flex-col items-end">
              <span className="text-sm line-through text-red-500">
                ${product.price.toFixed(2)}
              </span>
              <motion.span
                className="text-xl font-bold text-green-600"
                initial={featured ? { scale: 1 } : false}
                animate={featured ? { scale: [1, 1.1, 1] } : false}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                ${product.discountedPrice.toFixed(2)}
              </motion.span>
            </div>
          </div>
        </div>

        {featured && (
          <div className="flex gap-2 mt-2">
            {product.isDeliveryAvailable && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Delivery Available
              </span>
            )}
            {product.isDonation && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Donation
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
          </Button>
          <Button
            variant={featured ? "default" : "secondary"}
            className="flex items-center justify-center"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            Details {featured && <TrendingUp className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
