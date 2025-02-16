import { ProductFormData } from "@/types/product";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PredictPriceTabProps {
  form: UseFormReturn<ProductFormData>;
}

interface PriceAnalysis {
  percentage: number;
  reasoning: string;
  factors: {
    condition: string;
    expiry: string;
    market: string;
  };
}

const PriceInput = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        $
      </span>
      <Input {...props} className={cn("pl-7", className)} />
    </div>
  );
};

const PredictPriceTab = ({ form }: PredictPriceTabProps) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [analysis, setAnalysis] = useState<PriceAnalysis | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const isDonation = form.watch("isDonation");
  const originalPrice = form.watch("originalPrice");
  const condition = form.watch("condition");
  const description = form.watch("description");

  const getAIPriceRecommendation = async () => {
    try {
      setIsCalculating(true);
      setAnalysis(null);
      setHasCalculated(false);

      // Get required fields for AI calculation
      const productData = {
        originalPrice,
        condition,
        description,
        title: form.getValues("title"),
        category: form.getValues("category"),
        manufacturerDate: form.getValues("manufacturerDate"),
        expiryDate: form.getValues("expiryDate"),
      };

      const response = await fetch("/api/predict-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to get price recommendation");
      }

      const data = await response.json();

      // Update form with AI recommended prices
      form.setValue("discountedPrice", data.sellerPrice); // 40-60% of original
      form.setValue("price", data.marketPrice); // 70% of original
      setAnalysis(data.analysis);
      setHasCalculated(true);

      toast.success("Price recommendation calculated!");
    } catch (error) {
      console.error("Failed to calculate price", error);
      toast.error("Failed to calculate price. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Retail Price</FormLabel>
              <FormControl>
                <PriceInput
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
                Original retail price of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isDonation && (
          <>
            <Button
              type="button"
              onClick={getAIPriceRecommendation}
              disabled={isCalculating || !originalPrice}
              className="w-full"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating Best Price...
                </>
              ) : (
                "Calculate Best Price"
              )}
            </Button>

            {hasCalculated && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discountedPrice"
                  defaultValue={0}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>You Receive</FormLabel>
                      <FormControl>
                        <PriceInput
                          type="number"
                          readOnly
                          value={field.value || ""}
                          placeholder="0.00"
                          className="w-full bg-gray-100"
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        Amount you&apos;ll receive (40-60% of original)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Price</FormLabel>
                      <FormControl>
                        <PriceInput
                          type="number"
                          readOnly
                          value={field.value || ""}
                          placeholder="0.00"
                          className="w-full bg-gray-100"
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        Listed price (70% of original)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </>
        )}

        {analysis && (
          <div className="mt-6 space-y-4 border-t pt-4">
            <h3 className="font-semibold">Price Analysis</h3>
            <div className="text-sm space-y-2">
              <p className="text-muted-foreground">{analysis.reasoning}</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="font-medium">Condition Impact</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.factors.condition}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Expiry Impact</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.factors.expiry}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Market Impact</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.factors.market}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictPriceTab;
