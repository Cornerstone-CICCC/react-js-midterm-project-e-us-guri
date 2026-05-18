import { api } from "./api";

export interface OrderItem {
  id: number;
  product_id: string | null;
  name: string;
  brand: string;
  price: string;
  size: string;
  quantity: number;
}

export interface Order {
  id: number;
  user_id: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total_amount: string;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export function checkoutOrder(
  token: string | null,
  paymentIntentId?: string
): Promise<Order> {
  return api<Order>("/orders/checkout", {
    method: "POST",
    token,
    body: paymentIntentId ? { paymentIntentId } : undefined,
  });
}

export interface AdminOrder extends Order {
  user_email: string | null;
}

export function listAllOrders(token: string | null): Promise<AdminOrder[]> {
  return api<AdminOrder[]>("/orders/admin", { token });
}
