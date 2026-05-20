import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-hot-toast";
import { CartContext, type CartItem } from "./CartContext";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../services/cartService";
import { useAuth } from "../auth/AuthContext";

const recomputeTotal = (next: CartItem[]) =>
  next.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { token, user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsRef = useRef<CartItem[]>(items);
  itemsRef.current = items;

  const refresh = useCallback(
    async (opts: { silent?: boolean } = {}) => {
      if (!token || !user) {
        setItems([]);
        setTotal(0);
        return;
      }
      if (!opts.silent) setLoading(true);
      setError(null);
      try {
        const data = await getCart(token);
        setItems(data.items);
        setTotal(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load cart");
      } finally {
        if (!opts.silent) setLoading(false);
      }
    },
    [token, user]
  );

  useEffect(() => {
    if (authLoading) return;
    refresh();
  }, [authLoading, refresh]);

  const addItem = useCallback(
    async (productId: string, size: string, quantity = 1) => {
      if (!token) {
        toast.error("Sign in to add items to your cart");
        throw new Error("Sign in to add items to your cart");
      }
      try {
        await addCartItem(token, { productId, size, quantity });
        await refresh({ silent: true });
        toast.success("Cleat added to cart!");
      } catch {
        toast.error("Error! Try again later.");
      }
    },
    [token, refresh]
  );

  const updateQuantity = useCallback(
    async (itemId: number, quantity: number) => {
      if (!token) return;
      const next = itemsRef.current.map((it) =>
        it.id === itemId ? { ...it, quantity } : it
      );
      setItems(next);
      setTotal(recomputeTotal(next));
      try {
        await updateCartItem(token, itemId, quantity);
      } catch {
        toast.error("Error! Try again later.");
        refresh({ silent: true });
      }
    },
    [token, refresh]
  );

  const removeItem = useCallback(
    async (itemId: number) => {
      if (!token) return;
      
      const targetItem = itemsRef.current.find((it) => it.id === itemId);
      const itemName = targetItem?.name || "Product"; 

      const next = itemsRef.current.filter((it) => it.id !== itemId);
      setItems(next);
      setTotal(recomputeTotal(next));
      try {
        await removeCartItem(token, itemId);
        toast.error(`${itemName} removed from the cart!`);
      } catch {
        toast.error("Error! Try again later.");
        refresh({ silent: true });
      }
    },
    [token, refresh]
  );

  const clear = useCallback(async () => {
    if (!token) return;
    try {
      await clearCart(token);
      await refresh({ silent: true });
      toast.success("Cart successfully cleaned!");
    } catch {
      toast.error("Error! Try again later.");
    }
  }, [token, refresh]);

  const refreshPublic = useCallback(() => refresh(), [refresh]);

  const value = useMemo(
    () => ({
      items,
      total,
      loading,
      error,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      refresh: refreshPublic,
    }),
    [
      items,
      total,
      loading,
      error,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      refreshPublic,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};