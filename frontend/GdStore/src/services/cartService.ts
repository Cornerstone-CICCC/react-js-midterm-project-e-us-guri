import { api } from "./api";
import type { Category } from "./productsService";

export interface CartItem {
  id: number;
  product_id: string;
  size: string;
  quantity: number;
  name: string;
  brand: string;
  price: string;
  image_url: string | null;
  category: Category;
  stock: number;
}

export interface CartPayload {
  items: CartItem[];
  total: number;
}

export function getCart(token: string | null): Promise<CartPayload> {
  return api<CartPayload>("/cart", { token });
}

export function addCartItem(
  token: string | null,
  body: { productId: string; size: string; quantity?: number }
): Promise<unknown> {
  return api("/cart/items", { method: "POST", body, token });
}

export function updateCartItem(
  token: string | null,
  itemId: number,
  quantity: number
): Promise<unknown> {
  return api(`/cart/items/${itemId}`, {
    method: "PUT",
    body: { quantity },
    token,
  });
}

export function removeCartItem(
  token: string | null,
  itemId: number
): Promise<unknown> {
  return api(`/cart/items/${itemId}`, { method: "DELETE", token });
}

export function clearCart(token: string | null): Promise<unknown> {
  return api("/cart", { method: "DELETE", token });
}