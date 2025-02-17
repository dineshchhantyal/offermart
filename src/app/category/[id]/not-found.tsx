import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="container py-32 text-center">
      <Package className="mx-auto h-12 w-12 text-muted-foreground" />
      <h2 className="mt-4 text-2xl font-semibold">Category Not Found</h2>
      <p className="mt-2 text-muted-foreground">
        The category you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
