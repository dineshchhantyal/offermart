import { PaymentMethodType, ProductStatus } from "@prisma/client";
import * as z from "zod";

export const productSchema = z.object({
  // Basic Info
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title must be at least 3 characters"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, "Description must be at least 10 characters"),
  brand: z
    .string({
      required_error: "Brand is required",
    })
    .min(2, "Brand must be at least 2 characters"),
  images: z
    .array(
      z
        .string({
          required_error: "Image URL is required",
        })
        .url("Please provide a valid image URL")
    )
    .min(1, "At least one image is required"),

  categoryId: z.string({
    required_error: "Please select a category",
  }),
  condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR"], {
    required_error: "Product condition is required",
  }),

  // Pricing
  originalPrice: z
    .number({
      required_error: "Original price is required",
    })
    .positive("Original price must be positive"),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(0, "Price must be positive"),
  discountedPrice: z
    .number({
      invalid_type_error: "Discounted price must be a number",
      required_error: "Get a price quote from us",
    })

    .min(0, "Discounted price must be positive"),

  // Product Details
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1"),
  unit: z
    .string({
      required_error: "Unit is required",
    })
    .min(1, "Please specify the unit"),
  size: z
    .string({
      invalid_type_error: "Size must be a string",
    })
    .optional(),
  condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR"], {
    required_error: "Product condition is required",
  }),

  // Dates
  manufacturerDate: z
    .date({
      required_error: "Manufacturer date is required",
      invalid_type_error: "Please provide a valid date",
    })
    .max(new Date(), "Manufacturer date cannot be in the future"),
  expiryDate: z
    .date({
      required_error: "Expiry date is required",
      invalid_type_error: "Please provide a valid date",
    })
    .min(new Date(), "Expiry date must be in the future"),
  bestBefore: z
    .date({
      invalid_type_error: "Please provide a valid date",
    })
    .optional()
    .refine((date) => {
      if (!date) return true;
      return date < new Date(date.getTime() + 90 * 24 * 60 * 60 * 1000);
    }, "Best before date must be within 90 days"),

  // Location and Delivery
  pickupAddress: z
    .string({
      required_error: "Pickup address is required",
    })
    .min(5, "Please provide a valid pickup address"),
  isDeliveryAvailable: z.boolean().default(false),
  deliveryFee: z
    .number({
      invalid_type_error: "Delivery fee must be a number",
    })
    .min(0, "Delivery fee cannot be negative")
    .optional(),
  deliveryNotes: z.string().optional(),

  // Additional Info
  allergenInfo: z.string().optional(),
  storageInfo: z.string().optional(),

  // Payment and Status
  isDonation: z.boolean({
    required_error: "Please specify if this is a donation",
  }),
  paymentMethods: z
    .array(z.enum(["CASH", "BANK_TRANSFER", "MOBILE_PAYMENT", "CARD"]), {
      required_error: "Payment methods are required",
    })
    .min(1, "Select at least one payment method"),
  status: z
    .enum(["DRAFT", "PENDING", "VERIFIED", "REJECTED"], {
      required_error: "Status is required",
    })
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

export interface ProductWithDetails {
  id: string;
  title: string;
  description: string;
  brand: string;
  categoryId: string;
  price: number;
  discountedPrice: number;
  originalPrice?: number | null;
  quantity: number;
  unit: string;
  condition: ItemCondition;

  // Dates
  manufacturerDate?: Date | null;
  bestBefore?: Date | null;
  expiryDate: Date;

  // Location and Delivery
  pickupAddress: string;
  isDeliveryAvailable: boolean;
  deliveryFee?: number | null;
  deliveryNotes?: string | null;

  // Product Details
  allergenInfo?: string | null;
  storageInfo?: string | null;
  size?: string | null;

  // Payment and Status
  isDonation: boolean;
  commission: number;
  status: ProductStatus;
  paymentMethods: PaymentMethodType[];

  // Relations
  sellerId: string;
  seller: {
    id: string;
    name: string | null;
    image: string | null;
  };
  category: {
    id: string;
    name: string;
  };
  images: Array<{
    id: string;
    url: string;
    productId: string;
  }>;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
