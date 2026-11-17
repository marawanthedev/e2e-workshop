import { z } from "zod";

export const CATEGORIES = ["Electronics", "Clothing", "Home", "Accessories"] as const;

export const newProductSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  price: z.number({ error: "Price must be a number" }).positive("Price must be positive"),
  category: z.enum(CATEGORIES, { error: `Category must be one of: ${CATEGORIES.join(", ")}` }),
  image_url: z.url({ error: "Image URL must be a valid URL" }),
});
