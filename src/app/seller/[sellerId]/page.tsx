"use server";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import {
  Star,
  ShoppingCart,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Package,
  Users,
} from "lucide-react";
import { formatDistance } from "date-fns";
import { SellerStats } from "@/components/seller/stats";
import { SellerReviews } from "@/components/seller/reviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/seller/stats-card";

interface SellerPageProps {
  params: Promise<{ sellerId: string }>;
}

export default async function SellerPage({ params }: SellerPageProps) {
  const { sellerId } = await params;

  // Enhanced seller query with more details
  const seller = await db.user.findUnique({
    where: { id: sellerId },
    include: {
      sellerProducts: {
        where: { status: "VERIFIED" },
        include: {
          images: true,
          category: true,
          seller: true,
        },
      },
      _count: {
        select: {
          sellerProducts: true,
          sales: {
            where: { status: "COMPLETED" },
          },
          reviews: true,
        },
      },
      reviews: {
        include: {
          reviewer: {
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

  if (!seller) {
    notFound();
  }

  // Calculate average rating with fallback for no reviews
  const avgRating =
    seller.reviews.length > 0
      ? seller.reviews.reduce((acc, review) => acc + review.rating, 0) /
        seller.reviews.length
      : 0;

  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <header className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <div className="flex items-start gap-6">
            {seller.image ? (
              <Image
                src={seller.image}
                alt={seller.name || "Seller"}
                width={120}
                height={120}
                className="rounded-full"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {seller.name?.charAt(0) || "S"}
                </span>
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">
                  {seller.name || "Unknown Seller"}
                </h1>
                <Badge variant="secondary">Verified Seller</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined{" "}
                  {formatDistance(new Date(seller.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {seller.location || "Location not specified"}
                </span>
              </div>
              <div className="flex gap-4">
                <Button variant="default">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Request Call
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={<ShoppingCart className="h-5 w-5" />}
            title="Total Sales"
            value={seller._count.sales.toLocaleString()}
            delay={0.1}
          />

          <StatsCard
            icon={<Star className="h-5 w-5" />}
            title="Rating"
            value={avgRating === 0 ? "No ratings" : `${avgRating.toFixed(1)}/5`}
            subtext={
              seller.reviews.length > 0
                ? `${seller.reviews.length} reviews`
                : undefined
            }
            delay={0.2}
          />

          <StatsCard
            icon={<Package className="h-5 w-5" />}
            title="Products"
            value={seller._count.sellerProducts.toLocaleString()}
            delay={0.3}
          />

          <StatsCard
            icon={<Users className="h-5 w-5" />}
            title="Response Rate"
            value="98%"
            // subtext="Typically responds in 24h"
            delay={0.4}
          />
        </div>
      </header>

      {/* Main Content */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">
            Products ({seller._count.sellerProducts})
          </TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({seller._count.reviews})
          </TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {seller.sellerProducts.length > 0 ? (
              seller.sellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-12">
                No products available at the moment.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <SellerReviews reviews={seller.reviews} sellerId={sellerId} />
        </TabsContent>

        <TabsContent value="stats">
          <SellerStats seller={seller} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
