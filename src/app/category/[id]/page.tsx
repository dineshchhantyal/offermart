import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/skeletons/ProductGridSkeleton";
import { ProductGrid } from "@/components/products/ProductGrid";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

async function CategoryProducts({ categoryId }: { categoryId: string }) {
  const category = await db.category.findUnique({
    where: { id: categoryId },
    include: {
      products: {
        where: { status: "VERIFIED" },
        include: {
          images: true,
          seller: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!category) notFound();

  return (
    <>
      <CategoryHeader
        title={category.name}
        productCount={category.products.length}
      />
      <ProductGrid
        products={category.products.map((product) => ({
          ...product,
          seller: {
            ...product.seller,
            name: product.seller.name ?? "Unknown Seller",
          },
        }))}
      />
    </>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = (await params).id;
  return (
    <div className="container py-8">
      <Suspense fallback={<ProductGridSkeleton />}>
        <CategoryProducts categoryId={categoryId} />
      </Suspense>
    </div>
  );
}
