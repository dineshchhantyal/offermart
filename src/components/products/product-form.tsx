"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.number().positive("Price must be positive"),
  discountedPrice: z.number().positive("Discounted price must be positive"),
  originalPrice: z.number().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Please specify the unit"),
  expiryDate: z.date().min(new Date(), "Expiry date must be in the future"),
  bestBefore: z.date().optional(),
  manufacturerDate: z.date().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  size: z.string().optional(),
  isDonation: z.boolean(),
  condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR"]),
  pickupAddress: z.string().min(5, "Please provide a valid pickup address"),
  isDeliveryAvailable: z.boolean(),
  deliveryFee: z.number().optional(),
  paymentMethods: z
    .array(z.string())
    .min(1, "Select at least one payment method"),
  allergenInfo: z.string().optional(),
  storageInfo: z.string().optional(),
});

export function ProductForm() {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isDonation: false,
      isDeliveryAvailable: false,
      condition: "NEW",
      quantity: 1,
      paymentMethods: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      // Calculate commission
      const commission = data.isDonation ? 0 : 0.1;

      // Upload to server
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          commission,
        }),
      });

      if (!response.ok) throw new Error("Failed to create product");

      // Show success message
    } catch (error) {
      // Show error message

      console.error("ProductForm Error:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <ImageUpload
                  onChange={(urls) => form.setValue("images", urls)}
                  value={form.watch("images")}
                  maxFiles={5}
                />

                <Input
                  {...form.register("title")}
                  placeholder="Product Title"
                />
                <Textarea
                  {...form.register("description")}
                  placeholder="Description"
                />
                <Input {...form.register("brand")} placeholder="Brand" />

                <Select
                  onValueChange={(value) => form.setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="household">Household</SelectItem>
                    <SelectItem value="personal_care">Personal Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Original Price
                    </label>
                    <Input
                      {...form.register("originalPrice", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      placeholder="Original Retail Price"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Your Price</label>
                    <Input
                      {...form.register("price", { valueAsNumber: true })}
                      type="number"
                      placeholder="Your Selling Price"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                      {...form.register("quantity", { valueAsNumber: true })}
                      type="number"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Unit</label>
                    <Select
                      onValueChange={(value) => form.setValue("unit", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="liters">Liters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Important Dates</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Calendar
                      mode="single"
                      selected={form.watch("manufacturerDate")}
                      onSelect={(date) =>
                        form.setValue("manufacturerDate", date)
                      }
                      disabled={(date) => date > new Date()}
                      className="rounded-md border"
                    />
                    <Calendar
                      mode="single"
                      selected={form.watch("expiryDate")}
                      onSelect={(date) =>
                        date && form.setValue("expiryDate", date)
                      }
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                <Textarea
                  {...form.register("allergenInfo")}
                  placeholder="Allergen Information"
                />
                <Textarea
                  {...form.register("storageInfo")}
                  placeholder="Storage Requirements"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Continue with Delivery and Payment tabs... */}
      </Tabs>

      <Alert>
        <AlertDescription>
          All listed items will be verified by our team before being published.
        </AlertDescription>
      </Alert>

      <Button type="submit" className="w-full">
        List Product
      </Button>
    </form>
  );
}
