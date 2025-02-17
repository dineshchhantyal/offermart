import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center space-y-4">
      <h2 className="text-2xl font-bold">No Products Found</h2>
      <p className="text-muted-foreground">
        Could not find the products you were looking for.
      </p>
      <Button asChild>
        <Link href="/buy">Return to Buy Page</Link>
      </Button>
    </div>
  );
}
