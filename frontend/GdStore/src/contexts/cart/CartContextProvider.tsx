import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
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

  // Hold the latest items in a ref so action callbacks can stay stable
  // (no `items` in their dependency array) while still seeing fresh data.
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
      if (!token) throw new Error("Sign in to add items to your cart");
      await addCartItem(token, { productId, size, quantity });
      await refresh({ silent: true });
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
        refresh({ silent: true });
      }
    },
    [token, refresh]
  );

  const removeItem = useCallback(
    async (itemId: number) => {
      if (!token) return;
      const next = itemsRef.current.filter((it) => it.id !== itemId);
      setItems(next);
      setTotal(recomputeTotal(next));
      try {
        await removeCartItem(token, itemId);
      } catch {
        refresh({ silent: true });
      }
    },
    [token, refresh]
  );

  const clear = useCallback(async () => {
    if (!token) return;
    await clearCart(token);
    await refresh({ silent: true });
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
