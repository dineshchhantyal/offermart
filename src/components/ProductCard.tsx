
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {

    id: string;
    title: string;
    description: string;
    brand: string;
    image : string;
    categoryId: string;
    category: string;
    price: number;
    discountedPrice: number;
    expiryDate: string;
    size?: string;
    isDonation: boolean;
    commission: number;
    status: string;
    quantity: number;
    unit: string;
    pickupAddress: string;
    isDeliveryAvailable: boolean;
    deliveryFee?: number;
    paymentMethods: string[];
    condition: string;
    originalPrice?: number;
    manufacturerDate?: string;
    bestBefore?: string;
    allergenInfo?: string;
    storageInfo?: string;
    images: { url: string }[];
    sellerId: string;
    createdAt: string;
    updatedAt: string;

}


export interface ProductCardProps { 
    product: Product;
    }

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Card className="w-[300px] group relative space-y-4 overflow-hidden">
        <figure className="group-hover:opacity-90">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black">
            <HeartIcon className="size-4" />
          </Button>
          <Image
            className="aspect-square w-full"
            src={product.images[0].url}
            width={300}
            height={500}
            alt={product.title}
          />
        </figure>
        <CardContent className="px-4 py-0">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg">
                <Link href={product.title}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <p className="text-lg font-semibold line-through text-red-900">{product.price}</p>
            <p className="text-lg font-semibold">{product.discountedPrice}</p>
          </div>
        </CardContent>
        <CardFooter className="p-0 border-t">
          <Button variant="ghost" className="w-full">
            <PlusIcon className="size-4 me-1" /> Add to Card
          </Button>
        </CardFooter>
      </Card>
  
    );
  };    