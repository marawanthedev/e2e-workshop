import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import type { Product } from "../types";

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setAllProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const products =
    category === "All" ? allProducts : allProducts.filter((product) => product.category === category);

  return { products, category, setCategory, loading, error };
}
