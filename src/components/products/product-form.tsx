"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent } from "@/components/ui/tabs";
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
  FileText,
  Package,
  Truck,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PredictPriceTab from "./tabs/predict-price";
import { useRouter } from "next/navigation";

const TABS = [
  { id: "basic", label: "Basic Info", icon: FileText },
  { id: "details", label: "Product Details", icon: Package },
  { id: "delivery", label: "Delivery", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "price", label: "Pricing", icon: DollarSign },
] as const;
type TabType = (typeof TABS)[number]["id"];

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

      if (discountedPrice === 0 && !form.getValues("isDonation")) {
        toast.error("Discounted price cannot be zero");
        return;
      }

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

  const currentTabIndex = TABS.findIndex((tab) => tab.id === activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === TABS.length - 1;

  const tabFields = {
    basic: ["title", "description", "images", "categoryId", "condition"],
    details: [
      "originalPrice",
      "price",
      "quantity",
      "unit",
      "condition",
      "manufacturerDate",
      "expiryDate",
    ],
    delivery: ["pickupAddress", "isDeliveryAvailable"],
    payment: ["paymentMethods"],
    price: ["price", "discountedPrice"],
  } as const;

  const handleTabChange = async (tab: TabType) => {
    // Validate current tab fields before switching
    const currentTabFields = tabFields[activeTab];
    const isValid = await form.trigger([...currentTabFields]);

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

    const nextTab = TABS[currentTabIndex + 1].id;
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
  console.log("is last tab", isLastTab);
  const handleListProduct = async (data: ProductFormData) => {
    // Only allow submission from the last tab
    if (!isLastTab) {
      return;
    }

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
        onSubmit={(e) => {
          // Prevent submission if not on last tab
          if (!isLastTab) {
            e.preventDefault();
            return;
          }
          form.handleSubmit(handleListProduct)(e);
        }}
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

        <div className="mb-8">
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${(currentTabIndex / (TABS.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Tab indicators */}
            <div className="relative z-10 grid grid-cols-5 gap-4">
              {TABS.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = index === currentTabIndex;
                const isCompleted = index < currentTabIndex;
                const hasErrors = getTabErrors(tab.id as TabType);

                return (
                  <div key={tab.id} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleTabChange(tab.id as TabType)}
                      className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-full transition-all",
                        isActive && "bg-primary text-white",
                        isCompleted && "bg-primary/20",
                        !isActive && !isCompleted && "bg-gray-100",
                        hasErrors && "ring-2 ring-destructive"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {hasErrors && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive" />
                      )}
                    </button>
                    <span className="mt-2 text-xs font-medium">
                      {tab.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(tab) => handleTabChange(tab as TabType)}
          className="w-full"
        >
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

        <div className="sticky bottom-0 mt-8 flex justify-between gap-4 bg-white p-4 border-t">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleTabChange(TABS[currentTabIndex - 1].id as TabType)
              }
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Draft
            </Button>
          </div>

          <div className="flex gap-2">
            {!isLastTab && (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isDraftSaving || isListing}
                className="flex-1"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {isLastTab && (
              <Button
                type="submit"
                className="flex-1"
                disabled={isDraftSaving || isListing}
              >
                {isListing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Publish Product
              </Button>
            )}
          </div>
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
