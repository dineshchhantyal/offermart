import { Metadata } from "next";
import { Building2, Users, Leaf, BadgeDollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About OfferMart - Sustainable Shopping Made Simple",
  description:
    "Join OfferMart to reduce waste and save money. Perfect for businesses looking to minimize losses and shoppers seeking great deals.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to OfferMart</h1>
        <p className="text-xl text-muted-foreground">
          Connecting conscious buyers with sustainable sellers
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-bold">For Businesses</h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>• Turn potential waste into profit</p>
            <p>• List bulk items quickly and easily</p>
            <p>• Manage inventory efficiently</p>
            <p>• Track sales and impact metrics</p>
            <p>• Connect with conscious consumers</p>
          </div>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm">
              &nbsp;OfferMart helped us reduce waste by 40% while maintaining
              profitability&nbsp;
            </p>
            <p className="text-sm font-medium mt-2">- Local Business Owner</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold">For Shoppers</h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>• Save money on quality products</p>
            <p>• Support local businesses</p>
            <p>• Make sustainable choices</p>
            <p>• Easy pickup or delivery</p>
            <p>• Verified product quality</p>
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm">
              &nbsp;I save 30-50% on groceries while helping reduce waste
              .&nbsp;Win-win!&nbsp;
            </p>
            <p className="text-sm font-medium mt-2">- Regular Customer</p>
          </div>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card className="p-6 text-center">
          <Leaf className="h-12 w-12 mx-auto mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-2">2+ Tons</h3>
          <p className="text-muted-foreground">Waste Reduction Goal</p>
        </Card>
        <Card className="p-6 text-center">
          <BadgeDollarSign className="h-12 w-12 mx-auto mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-2">30-50%</h3>
          <p className="text-muted-foreground">Average Savings</p>
        </Card>
        <Card className="p-6 text-center sm:col-span-2 lg:col-span-1">
          <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-2">500+</h3>
          <p className="text-muted-foreground">Active Community Members</p>
        </Card>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
        <p className="text-muted-foreground">
          At OfferMart, we&apos;re building a sustainable future by connecting
          businesses with conscious consumers. Our platform makes it easy to
          reduce waste while creating value for everyone involved. Join us in
          making a difference, one purchase at a time.
        </p>
      </div>
    </div>
  );
}
