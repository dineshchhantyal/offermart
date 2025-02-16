import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  images: string[];
  originalPrice: number;
  price: number;
  discountedPrice: number;
  quantity: number;
  unit: string;
  size?: string;
  condition: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR";
  manufacturerDate: string; // ISO string
  expiryDate: string;       // ISO string
  bestBefore?: string | null; // ISO string or null
  pickupAddress: string;
  isDeliveryAvailable: boolean;
  deliveryFee?: number;
  deliveryNotes?: string;
  allergenInfo?: string;
  storageInfo?: string;
  isDonation: boolean;
  paymentMethods: ("CASH" | "BANK_TRANSFER" | "MOBILE_PAYMENT" | "CARD")[];
}

export interface ProductCardProps { 
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="w-[300px] group relative overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
      <figure className="relative">
        <Image 
          className="w-full h-56 object-cover"
          src={product.images[0]}
          width={300}
          height={224}
          alt={product.title}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 rounded-full shadow-sm"
        >
          <HeartIcon className="w-5 h-5 text-red-500" />
        </Button>
      </figure>
      <CardContent className="p-4">
        <div className="flex justify-between">
          {/* Left Column: Product & Brand */}
          <div className="flex flex-col space-y-1">
            <h3 className="text-lg font-semibold">
              <Link href={`/product/${encodeURIComponent(product.title)}`} className="hover:underline">
                {product.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
          {/* Right Column: Expiry & Price */}
          <div className="flex flex-col items-end space-y-1">
            <p className="text-xs text-gray-500">
              Expires: {product.expiryDate.split("T")[0]}
            </p>
            <div className="flex space-x-1 items-baseline">
             
              <span className="text-sm line-through text-red-500">
                ${product.price}
              </span>
              <span className="text-xl font-bold text-green-600">
                ${product.discountedPrice}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t border-gray-200">
        <Button variant="default" className="w-full flex items-center justify-center">
          <PlusIcon className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};