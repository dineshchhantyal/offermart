import * as z from "zod";
import { Product, Category, Image } from "@prisma/client";

export const productSchema = z.object({
  // Basic Info

  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),

  // Pricing
  originalPrice: z.number().positive("Original price must be positive"),
  price: z.number().positive("Price must be positive"),
  discountedPrice: z.number().positive("Discounted price must be positive"),
  // Product Details
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Please specify the unit"),
  size: z.string().optional(),
  condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR"]),

  // Dates
  manufacturerDate: z
    .date()
    .max(new Date(), "Manufacturer date cannot be in the future"),
  expiryDate: z.date().min(new Date(), "Expiry date must be in the future"),
  bestBefore: z
    .date()
    .optional()
    .refine((date) => {
      if (!date) return true;
      return date < new Date(date.getTime() + 90 * 24 * 60 * 60 * 1000);
    }, "Best before date must be within 90 days"),

  // Location and Delivery
  pickupAddress: z.string().min(5, "Please provide a valid pickup address"),
  isDeliveryAvailable: z.boolean().default(false),
  deliveryFee: z.number().min(0).optional(),
  deliveryNotes: z.string().optional(),

  // Additional Info
  allergenInfo: z.string().optional(),
  storageInfo: z.string().optional(),

  // Payment and Status
  isDonation: z.boolean(),
  paymentMethods: z
    .array(z.enum(["CASH", "BANK_TRANSFER", "MOBILE_PAYMENT", "CARD"]))
    .min(1, "Select at least one payment method"),
  status: z
    .enum(["DRAFT", "PENDING", "VERIFIED", "REJECTED"])
    .default("PENDING"),
});

// Add type safety for payment methods
export const PaymentMethodEnum = z.enum([
  "CASH",
  "BANK_TRANSFER",
  "MOBILE_PAYMENT",
  "CARD",
]);
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;

// Add type safety for product condition
export const ItemConditionEnum = z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR"]);
export type ItemCondition = z.infer<typeof ItemConditionEnum>;

export type ProductFormData = z.infer<typeof productSchema>;

export const ProductFormDefaults: Partial<ProductFormData> = {
  quantity: 1,
  unit: "pieces",
  condition: "NEW",
  manufacturerDate: new Date(),
  expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  isDeliveryAvailable: false,
  isDonation: false,
  paymentMethods: [],
  status: "DRAFT",
};

export const TAB_FIELDS = {
  basic: ["title", "description", "category", "images"],
  details: ["originalPrice", "price", "quantity", "unit", "condition"],
  delivery: ["pickupAddress", "isDeliveryAvailable"],
  payment: ["paymentMethods"],
} as const;

export type TabType = keyof typeof TAB_FIELDS;

export function productWithIdSchema(id: string) {
  return productSchema.extend({
    id: z.literal(id),
  });
}

export type ProductWithDetails = Product & {
  category: Category;
  images: Image[];
};
