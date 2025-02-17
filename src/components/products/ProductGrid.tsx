import { Product } from "@prisma/client";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductGridProps {
  products: Array<
    Product & {
      images: { url: string }[];
      seller: {
        id: string;
        name: string;
        image: string | null;
      };
    }
  >;
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
