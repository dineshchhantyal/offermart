import { z } from "zod";

export const ProductSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  brand: z.string().min(2),
  categoryId: z.string().uuid(),
  price: z.number().positive(),
  discountedPrice: z.number().positive(),
  expiryDate: z.string().datetime(),
  images: z.array(z.string().url()),
  size: z.string().optional(),
  isDonation: z.boolean(),
  commission: z.number().min(0).max(1),
});

export type Product = z.infer<typeof ProductSchema>;
