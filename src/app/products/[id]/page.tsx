import { ProductView } from "@/components/products/product-view";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Metadata } from "next";

// Define the params type
type Props = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        seller: true,
      },
    });

    return product;
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return null;
  }
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<{id: string} & Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return {
      id: resolvedParams.id,
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    id: resolvedParams.id,
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map((image) => ({
        url: image.url,
      })),
    },
  };
}
