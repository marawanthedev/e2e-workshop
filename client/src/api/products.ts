import type { Product } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export async function fetchProducts(): Promise<Product[]> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/products`);
  } catch {
    throw new Error("Cannot reach the API. Is the server running?");
  }
  if (!res.ok) throw new Error("Could not load products");
  return res.json();
}
