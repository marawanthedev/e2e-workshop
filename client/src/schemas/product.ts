import { z } from "zod";
import { CATEGORIES } from "../constants";

const PRODUCT_CATEGORIES = CATEGORIES.filter((category) => category !== "All");

export const productSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  price: z.coerce.number({ error: "Price must be a number" }).positive("Price must be positive"),
  category: z.enum(PRODUCT_CATEGORIES as [string, ...string[]], {
    error: `Category must be one of: ${PRODUCT_CATEGORIES.join(", ")}`,
  }),
  image_url: z.url({ error: "Image URL must be a valid URL" }),
});
