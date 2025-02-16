"use client";
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { toast } from "sonner";
import { BasicInfoTab } from "./tabs/basic-info";
import ProductDetailsTab from "./tabs/product-details";
import DeliveryTab from "./tabs/delivery-tab";
import PaymentTab from "./tabs/payment-tab";
import {
  productSchema,
  ProductFormData,
  ProductFormDefaults,
} from "@/types/product";

export function ProductForm() {
  const methods = useForm();
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: ProductFormDefaults,
  });

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      const commission = data.isDonation ? 0 : 0.1;
      const formattedData = {
        ...data,
        commission,
        status: "PENDING",
        manufacturerDate: data.manufacturerDate.toISOString(),
        expiryDate: data.expiryDate.toISOString(),
        bestBefore: data.bestBefore?.toISOString(),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create product");
      }

      toast("Your product has been listed for review.");

      form.reset();
    } catch (error) {
      toast(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoTab form={form} />
          </TabsContent>

          <TabsContent value="details">
            <ProductDetailsTab form={form} />
          </TabsContent>

          <TabsContent value="delivery">
            <DeliveryTab form={form} />
          </TabsContent>

          <TabsContent value="payment">
            <PaymentTab form={form} />
          </TabsContent>
        </Tabs>

        <Alert>
          <AlertDescription>
            All listed items will be verified by our team before being
            published.
            {form.watch("isDonation")
              ? " No commission will be charged for donations."
              : " A 10% commission will be applied to the sale price."}
          </AlertDescription>
        </Alert>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Listing..." : "List Product"}
        </Button>
      </form>
    </FormProvider>
  );
}
