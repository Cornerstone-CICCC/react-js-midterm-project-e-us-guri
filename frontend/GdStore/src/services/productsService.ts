import { api } from "./api";

export type Category = "artificial-grass" | "natural-grass" | "futsal";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  description: string | null;
  image_url: string | null;
  category: Category;
  sizes: string[];
  stock: number;
  created_at?: string;
  updated_at?: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  "artificial-grass": "Artificial Grass",
  "natural-grass": "Natural Grass",
  futsal: "Futsal",
};

export async function listProducts(opts: {
  category?: Category;
  search?: string;
  limit?: number;
} = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  params.set("limit", String(opts.limit ?? 100));
  if (opts.category) params.set("category", opts.category);
  if (opts.search) params.set("search", opts.search);

  const res = await api<ProductsResponse>(`/products?${params}`);
  return res.products;
}

export async function getProduct(id: string): Promise<Product> {
  return api<Product>(`/products/${id}`);
}
