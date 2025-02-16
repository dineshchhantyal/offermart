"use server";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";

interface SellerPageProps {
  params: Promise<{ sellerId: string }>;
}

export default async function SellerPage({ params }: SellerPageProps) {
  const { sellerId } = await params;

  // Fetch seller information and their verified products
  const seller = await db.user.findUnique({
    where: { id: sellerId },
    include: {
      sellerProducts: {
        where: { status: "VERIFIED" },
        include: { images: true, category: true, seller: true },
      },
    },
  });

  if (!seller) {
    notFound();
  }

  return (
    <div className="p-6">
      <header className="flex items-center gap-6 border-b pb-4 mb-6">
        {seller.image ? (
          <Image
            src={seller.image}
            alt={seller.name || "Seller"}
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {seller.name?.charAt(0) || "S"}
            </span>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">
            {seller.name || "Unknown Seller"}
          </h1>
          {seller.email && <p className="text-gray-600">{seller.email}</p>}
        </div>
      </header>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seller.sellerProducts.length > 0 ? (
            seller.sellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}