import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/types/product";
import { cn } from "@/lib/utils";

interface DeliveryTabProps {
  form: UseFormReturn<ProductFormData>;
  className?: string;
}

export function DeliveryTab({ form, className }: DeliveryTabProps) {
  const isDeliveryAvailable = form.watch("isDeliveryAvailable");
  const isDonation = form.watch("isDonation");

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Delivery Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pickup Address Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter the complete pickup address"
                    rows={3}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription>
                  This address will be shared with buyers after purchase
                  confirmation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Delivery Options Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="isDeliveryAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isDonation}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Delivery Available
                    {isDonation && " (Not available for donations)"}
                  </FormLabel>
                  <FormDescription>
                    Enable this if you can deliver the product to the buyer
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {isDeliveryAvailable && !isDonation && (
            <div className="ml-7 space-y-4">
              <FormField
                control={form.control}
                name="deliveryFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : parseFloat(value));
                        }}
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                        className="w-[200px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the fixed delivery fee (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Any specific delivery instructions or limitations"
                        rows={2}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default DeliveryTab;
