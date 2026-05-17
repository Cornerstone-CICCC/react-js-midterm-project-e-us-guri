import { createContext } from "react";
import type { CartItem } from "../../services/cartService";

export type { CartItem };

export interface CartContextType {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
  addItem: (productId: string, size: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);
