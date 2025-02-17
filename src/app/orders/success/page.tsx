import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We will send you a confirmation email with
          your order details.
        </p>
        <Button asChild>
          <Link href="/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  );
}
