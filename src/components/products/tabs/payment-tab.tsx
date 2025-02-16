"use client";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductFormData } from "@/types/product";
import { CreditCard, Smartphone, Building2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaCashRegister } from "react-icons/fa";

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

interface PaymentItemProps {
  label: string;
  description: string;
  icon: React.ElementType;
  isSelected: boolean;
  onToggle: () => void;
}

const PaymentItem = ({
  label,
  description,
  icon: Icon,
  isSelected,
  onToggle,
}: PaymentItemProps) => (
  <div
    role="button"
    tabIndex={0}
    className={cn(
      "relative w-full flex items-start space-x-4 rounded-md border p-4 cursor-pointer hover:bg-accent",
      isSelected && "border-primary ring-2 ring-primary ring-offset-2"
    )}
    onClick={onToggle}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
    }}
  >
    <Icon className="h-5 w-5 shrink-0" />
    <div className="flex-1 text-left space-y-1">
      <p className="font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div
      className={cn(
        "absolute right-2 top-2 h-5 w-5 rounded-full border",
        isSelected && "bg-primary text-primary-foreground"
      )}
    >
      {isSelected && <Check className="h-4 w-4" />}
    </div>
  </div>
);

function PaymentTab({
  form,
  className,
}: {
  form: UseFormReturn<ProductFormData>;
  className?: string;
}) {
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
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold">
                Accepted Payment Methods
              </FormLabel>
              <FormDescription>
                Select all payment methods you can accept
              </FormDescription>
              <div className="grid sm:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <PaymentItem
                    key={method.id}
                    label={method.label}
                    description={method.description}
                    icon={method.icon}
                    isSelected={field.value?.includes(method.id) ?? false}
                    onToggle={() => {
                      const isSelected =
                        field.value?.includes(method.id) ?? false;
                      const newValue = isSelected
                        ? (field.value ?? []).filter((id) => id !== method.id)
                        : [...(field.value ?? []), method.id];
                      field.onChange(newValue);
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isDonation"
          render={({ field }) => (
            <FormItem>
              <div className="relative w-full flex items-start space-x-4 rounded-md border p-4">
                <div className="flex-1 text-left space-y-1">
                  <p className="font-medium">Mark as Donation</p>
                  <p className="text-sm text-muted-foreground">
                    No commission will be charged for donated items. This option
                    helps reduce waste and support the community.
                  </p>
                </div>
                <div className="ml-auto">
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </div>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default React.memo(PaymentTab);
