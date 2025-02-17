import { Product } from "@prisma/client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product & {
    images: { url: string }[];
    seller: {
      id: string;
      name: string;
      image: string | null;
    };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={product.images[0]?.url || "/placeholder.png"}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium truncate">{product.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-muted-foreground">
              {product.seller.name}
            </p>
            <p className="font-medium">
              {formatPrice(product.discountedPrice || product.price)}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
