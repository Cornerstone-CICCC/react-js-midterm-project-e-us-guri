import { api } from "./api";

export interface AdminStats {
  monthlySales: {
    current: number;
    previous: number;
    deltaPct: number | null;
  };
  lowStock: number;
  activeOrders: {
    total: number;
    pendingShipment: number;
  };
}

export function getAdminStats(token: string | null): Promise<AdminStats> {
  return api<AdminStats>("/admin/stats", { token });
}
