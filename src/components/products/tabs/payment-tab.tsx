import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductFormData } from "@/types/product";
import { CreditCard, Smartphone, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaCashRegister } from "react-icons/fa";

interface PaymentTabProps {
  form: UseFormReturn<ProductFormData>;
  className?: string;
}

const PAYMENT_METHODS = [
  {
    id: "CASH",
    label: "Cash on Pickup",
    description: "Accept cash payment when buyer picks up the item",
    icon: FaCashRegister,
  },
  {
    id: "BANK_TRANSFER",
    label: "Bank Transfer",
    description: "Direct bank transfer before pickup/delivery",
    icon: Building2,
  },
  {
    id: "MOBILE_PAYMENT",
    label: "Mobile Payment",
    description: "Digital wallets and mobile payment apps",
    icon: Smartphone,
  },
  {
    id: "CARD",
    label: "Card Payment",
    description: "Credit or debit card payments",
    icon: CreditCard,
  },
] as const;

const PaymentTab = ({ form, className }: PaymentTabProps) => {
  const isDonation = form.watch("isDonation");
  console.log(isDonation);

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Choose your preferred payment methods and set donation status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="paymentMethods"
          render={() => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Accepted Payment Methods
              </FormLabel>
              <FormDescription>
                Select all payment methods you can accept
              </FormDescription>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                {PAYMENT_METHODS.map(
                  ({ id, label, description, icon: Icon }) => (
                    <FormField
                      key={id}
                      control={form.control}
                      name="paymentMethods"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div
                              className={cn(
                                "flex items-start space-x-4 rounded-md border p-4 hover:bg-accent cursor-pointer",
                                field.value?.includes(id) &&
                                  "border-primary bg-accent"
                              )}
                              onClick={() => {
                                const currentValue = field.value || [];
                                field.onChange(
                                  currentValue.includes(id)
                                    ? currentValue.filter(
                                        (value) => value !== id
                                      )
                                    : [...currentValue, id]
                                );
                              }}
                            >
                              <Icon className="mt-1 h-5 w-5" />
                              <div className="space-y-1">
                                <FormLabel className="text-sm font-medium leading-none">
                                  {label}
                                </FormLabel>
                                <FormDescription className="text-xs">
                                  {description}
                                </FormDescription>
                              </div>
                              <Checkbox
                                checked={field.value?.includes(id)}
                                className="ml-auto mt-1"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border-t pt-6">
          <FormField
            control={form.control}
            name="isDonation"
            render={({ field }) => (
              <FormItem>
                <div
                  className={cn(
                    "flex items-start space-x-4 rounded-md border p-4 hover:bg-accent cursor-pointer",
                    field.value && "border-primary bg-accent"
                  )}
                  onClick={() => field.onChange(!field.value)}
                >
                  <div className="space-y-1 flex-1">
                    <FormLabel className="text-base font-semibold">
                      Mark as Donation
                    </FormLabel>
                    <FormDescription>
                      No commission will be charged for donated items. This
                      option helps reduce waste and support the community.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentTab;
