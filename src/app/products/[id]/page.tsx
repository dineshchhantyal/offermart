import { ProductView } from "@/components/products/product-view";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { ProductWithDetails } from "@/types/product";

// Define the params type
type Props = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string): Promise<ProductWithDetails | null> {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
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

    if (!product) return null;

    // Transform the product data to match ProductWithDetails type
    const transformedProduct: ProductWithDetails = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice ?? undefined,
      discountedPrice: product.discountedPrice ?? undefined,
      quantity: product.quantity,
      unit: product.unit,
      condition: product.condition,
      status: product.status,
      isDonation: product.isDonation,
      isDeliveryAvailable: product.isDeliveryAvailable,
      pickupAddress: product.pickupAddress,
      // Add required fields
      categoryId: product.categoryId,
      commission: product.commission ?? 0, // Provide a default value if null
      // Handle dates properly
      manufacturerDate: product.manufacturerDate ?? undefined,
      expiryDate: product.expiryDate,
      bestBefore: product.bestBefore ?? undefined,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      // Relations
      sellerId: product.sellerId,
      seller: {
        id: product.seller.id,
        name: product.seller.name,
        image: product.seller.image,
      },
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      images: product.images.map((image) => ({
        id: image.id,
        url: image.url,
        productId: image.productId,
      })),
      paymentMethods: product.paymentMethods ?? [], // Provide empty array as default
      brand: product.brand ?? "", // Provide empty string as default
    };

    return transformedProduct;
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
export async function generateMetadata({
  params,
}: Props): Promise<{ id: string } & Metadata> {
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
