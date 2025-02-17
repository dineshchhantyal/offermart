import { ListingsSkeleton } from "@/components/skeletons/ListingsSkeleton";

export default function LoadingListings() {
  return (
    <div className="container py-6">
      <ListingsSkeleton />
    </div>
  );
}
