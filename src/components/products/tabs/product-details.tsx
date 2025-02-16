import { ProductFormData } from "@/types/product";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
interface ProductDetailsTabProps {
  form: UseFormReturn<ProductFormData>;
}

const ProductDetailsTab = ({ form }: ProductDetailsTabProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Original Price</label>
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
              <Select onValueChange={(value) => form.setValue("unit", value)}>
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
                  date && form.setValue("manufacturerDate", date)
                }
                disabled={(date) => date > new Date()}
                className="rounded-md border"
              />
              <Calendar
                mode="single"
                selected={form.watch("expiryDate")}
                onSelect={(date) => date && form.setValue("expiryDate", date)}
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
  );
};

export default ProductDetailsTab;
