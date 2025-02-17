import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProductListings } from "@/components/products/product-listings";
import { Suspense } from "react";
import { ListingsSkeleton } from "@/components/skeletons/ListingsSkeleton";

export default async function ListingsPage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect("/auth/login?callbackUrl=/sell/listings");
  }

  return (
    <div className="container py-6">
      <Suspense fallback={<ListingsSkeleton />}>
        <ProductListings userId={user.id} />
      </Suspense>
    </div>
  );
}
