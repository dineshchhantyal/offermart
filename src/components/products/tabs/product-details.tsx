import { ProductFormData } from "@/types/product";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, DollarSign } from "lucide-react";

interface ProductDetailsTabProps {
  form: UseFormReturn<ProductFormData>;
  className?: string;
}

const ProductDetailsTab = ({ form, className }: ProductDetailsTabProps) => {
  return (
    <Card className={cn("", className)}>
      <CardContent className="pt-6 space-y-6">
        {/* Pricing Section */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="originalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value || ""}
                      className="pl-8"
                    />
                  </div>
                </FormControl>
                <FormDescription>Original retail price</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value || ""}
                      className="pl-8"
                    />
                  </div>
                </FormControl>
                <FormDescription>Your selling price</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Quantity and Unit Section */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Updated Dates Section */}
        <div className="space-y-4">
          <FormLabel>Important Dates</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="manufacturerDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturing Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          field.onChange(date);
                        }}
                        max={format(new Date(), "yyyy-MM-dd")}
                        min="2000-01-01"
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Date when the product was manufactured
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          field.onChange(date);
                        }}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Date when the product expires
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bestBefore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Best Before (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        onChange={(e) => {
                          const date = e.target.value
                            ? new Date(e.target.value)
                            : null;
                          field.onChange(date);
                        }}
                        min={format(new Date(), "yyyy-MM-dd")}
                        max={format(
                          new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                          "yyyy-MM-dd"
                        )}
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Recommended consumption date (within 90 days)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="allergenInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allergen Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List any allergens or dietary restrictions..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storageInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Specify storage conditions..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsTab;
