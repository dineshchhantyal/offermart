"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Loader2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Save,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PredictPriceTab from "./tabs/predict-price";
import { useRouter } from "next/navigation";

const TABS = ["basic", "details", "delivery", "payment", "price"] as const;
type TabType = (typeof TABS)[number];

export function ProductForm() {
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const router = useRouter();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...ProductFormDefaults,
      paymentMethods: [],
      isDonation: false,
    },
  });

  console.log("Form values", form.formState.errors);

  const discountedPrice = form.watch("discountedPrice");

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

  const onSubmit = async (data: ProductFormData, isDraft: boolean = false) => {
    try {
      setError(undefined);
      setSuccess(undefined);

      const commission = calculateCommission(data);

      // Format the data according to Prisma schema
      const formattedData = {
        ...data,
        commission,
        status: isDraft ? "DRAFT" : "VERIFIED",
        manufacturerDate: data.manufacturerDate.toISOString(),
        expiryDate: data.expiryDate.toISOString(),
        bestBefore: data.bestBefore?.toISOString() || null,
        images: Array.isArray(data.images) ? data.images : [],
        // Format payment methods to match enum values
        paymentMethods: data.paymentMethods,
      };

      console.log("Creating product with data", formattedData);

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to create product");
      }

      setSuccess(
        isDraft
          ? "Product saved as draft!"
          : "Your product has been listed for review!"
      );
      toast.success(
        isDraft ? "Draft saved successfully" : "Product listed successfully"
      );
      form.reset();

      // redirect to product page

      if (!isDraft) {
        // Redirect to product page
        router.push(`/products/${responseData.data.id}`);
      }
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

  const tabFields = {
    basic: ["title", "description", "category", "images"] as const,
    details: [
      "originalPrice",
      "price",
      "quantity",
      "unit",
      "condition",
      "manufacturerDate",
      "expiryDate",
    ] as const,
    delivery: ["pickupAddress", "isDeliveryAvailable"] as const,
    payment: ["paymentMethods"] as const,
    price: ["price", "discountedPrice"] as const,
  };

  const handleTabChange = async (tab: TabType) => {
    // Validate current tab fields before switching
    const currentTabFields = tabFields[activeTab];
    const isValid = await form.trigger(currentTabFields);

    if (!isValid) {
      toast.error("Please fill in all required fields in current tab");
      return;
    }

    setActiveTab(tab);
  };

  const handleNext = async () => {
    const currentTabFields = tabFields[activeTab];
    const isValid = await form.trigger(currentTabFields);

    if (!isValid) {
      toast.error("Please fill in all required fields in current tab");
      return;
    }

    const nextTab = TABS[currentTabIndex + 1];
    setActiveTab(nextTab);
  };

  // Add this helper function to show tab errors
  const getTabErrors = (tab: TabType) => {
    const fields = tabFields[tab];
    const errors = fields
      .map(
        (field) =>
          form.formState.errors[field as keyof ProductFormData]?.message
      )
      .filter(Boolean);
    return errors.length > 0 ? errors : null;
  };

  const handleSaveAsDraft = async () => {
    try {
      setIsDraftSaving(true);

      // Don't validate all fields for drafts
      const basicFieldsValid = await form.trigger(tabFields.basic);
      if (!basicFieldsValid) {
        toast.error(
          "Please fill in the basic information before saving as draft"
        );
        return;
      }

      await onSubmit(form.getValues(), true);
    } catch (error) {
      console.error("Failed to save draft", error);
      toast.error("Failed to save draft");
    } finally {
      setIsDraftSaving(false);
    }
  };

  const handleListProduct = async (data: ProductFormData) => {
    try {
      setIsListing(true);
      await onSubmit(data, false);
    } finally {
      setIsListing(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleListProduct)}
        className="space-y-8"
      >
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
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
          <TabsList className="grid w-full grid-cols-5">
            {TABS.map((tab) => {
              const tabErrors = getTabErrors(tab);
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={cn(
                    "capitalize relative",
                    tabErrors && "text-destructive"
                  )}
                >
                  {tab}
                  {tabErrors && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
                  )}
                </TabsTrigger>
              );
            })}
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

          <TabsContent value="price">
            <PredictPriceTab form={form} />
          </TabsContent>
        </Tabs>

        {/* Show current tab errors */}
        {getTabErrors(activeTab) && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc pl-4">
                {getTabErrors(activeTab)?.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between gap-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleTabChange(TABS[currentTabIndex - 1])}
              disabled={isFirstTab || isDraftSaving || isListing}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveAsDraft}
              disabled={isDraftSaving || isListing}
            >
              {isDraftSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Draft...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </>
              )}
            </Button>
          </div>

          {isLastTab ? (
            <Button
              type="submit"
              className="flex-1"
              disabled={isDraftSaving || isListing}
            >
              {isListing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Publish Product
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isDraftSaving || isListing || discountedPrice === 0}
              className="flex-1"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Show processing indicator */}
        {(isDraftSaving || isListing) && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
            <div className="flex h-full items-center justify-center">
              <div className="flex items-center gap-2 rounded-lg bg-background p-4 shadow-lg">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm font-medium">
                  {isDraftSaving ? "Saving draft..." : "Publishing product..."}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
