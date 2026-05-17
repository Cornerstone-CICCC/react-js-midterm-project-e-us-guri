import { useEffect, useState } from "react";
import {
  listProducts,
  type Category,
  type Product,
} from "../services/productsService";

export function useProducts(category?: Category) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    listProducts({ category })
      .then(setProducts)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load products")
      )
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading, error };
}
