import { ProductView } from "@/components/products/product-view";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}
