"use client";

import { useState } from "react";
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
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react";

const TABS = ["basic", "details", "delivery", "payment"] as const;
type TabType = (typeof TABS)[number];

export function ProductForm() {
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...ProductFormDefaults,
      paymentMethods: [],
      isDonation: false,
    },
  });

  const calculateCommission = (data: ProductFormData) => {
    if (data.isDonation) return 0;

    // Base commission is 10%
    let commission = 0.1;

    // Reduce commission for items close to expiry
    const daysToExpiry = Math.ceil(
      (data.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysToExpiry < 30) {
      commission *= 0.5; // 50% reduction for items expiring within 30 days
    }

    // Additional reduction for bulk items
    if (data.quantity > 10) {
      commission *= 0.9; // 10% reduction for bulk items
    }

    return commission;
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      setError(undefined);
      setSuccess(undefined);

      const commission = calculateCommission(data);
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

      setSuccess("Your product has been listed for review!");
      toast.success("Product listed successfully");
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setError(message);
      toast.error(message);
    }
  };

  const currentTabIndex = TABS.indexOf(activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === TABS.length - 1;

  const handleTabChange = (tab: TabType) => {
    const tabFields = {
      basic: ["title", "description", "category", "images"] as const,
      details: [
        "originalPrice",
        "price",
        "quantity",
        "unit",
        "condition",
      ] as const,
      delivery: ["pickupAddress", "isDeliveryAvailable"] as const,
      payment: ["paymentMethods"] as const,
    };

    // Validate current tab fields before switching
    form
      .trigger([...tabFields[activeTab]] as Array<keyof ProductFormData>)
      .then((isValid) => {
        if (isValid) setActiveTab(tab);
      });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert>
            <AlertDescription className="text-green-600">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onValueChange={(tab) => handleTabChange(tab as TabType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            {TABS.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="capitalize">
                {tab}
              </TabsTrigger>
            ))}
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

        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleTabChange(TABS[currentTabIndex - 1])}
            disabled={isFirstTab}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {isLastTab ? (
            <Button
              type="submit"
              className="flex-1"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Listing...
                </>
              ) : (
                "List Product"
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => handleTabChange(TABS[currentTabIndex + 1])}
              className="flex-1"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
