import { z } from "zod/v4";

const productSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

const orderSchema = z.object({
  userId: z.string().min(1),
  products: z.array(productSchema).min(1, "At least one product is required"),
});

export default orderSchema;
