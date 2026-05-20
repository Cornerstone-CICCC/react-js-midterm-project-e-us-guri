import { Fragment, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../contexts/auth/AuthContext";
import { UploadButton } from "../lib/uploadthing";
import { listAllOrders, type AdminOrder } from "../services/ordersService";
import { getAdminStats, type AdminStats } from "../services/adminService";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  description: string | null;
  image_url: string | null;
  category: "artificial-grass" | "natural-grass" | "futsal";
  sizes: string[];
  stock: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

const CATEGORIES: Product["category"][] = [
  "artificial-grass",
  "natural-grass",
  "futsal",
];

const CATEGORY_LABEL: Record<Product["category"], string> = {
  "artificial-grass": "Artificial Grass",
  "natural-grass": "Natural Grass",
  futsal: "Futsal",
};

type AdminTab = "inventory" | "orders" | "analytics" | "customers" | "settings";

const NAV_ITEMS: { icon: string; label: string; tab: AdminTab }[] = [
  { icon: "inventory_2", label: "Inventory", tab: "inventory" },
  { icon: "receipt_long", label: "Orders", tab: "orders" },
  { icon: "leaderboard", label: "Analytics", tab: "analytics" },
  { icon: "group", label: "Customers", tab: "customers" },
  { icon: "settings", label: "Settings", tab: "settings" },
];

const ORDER_STATUS_STYLES: Record<AdminOrder["status"], string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  paid: "bg-primary/15 text-primary border-primary/30",
  shipped: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

function skuFor(p: Product) {
  const prefix = p.brand.slice(0, 3).toUpperCase();
  const shortId = p.id.replace(/-/g, "").slice(0, 6).toUpperCase();
  return `GD-${prefix}-${shortId}`;
}

function stockBar(stock: number) {
  const pct = Math.min(100, Math.round((stock / 100) * 100));
  return Math.max(4, pct);
}

const Admin = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("inventory");
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setAccountMenuOpen(false);
    await logout();
    navigate("/login", { replace: true });
  };

  const fetchProducts = () => {
    setLoading(true);
    return api<ProductsResponse>("/products?limit=100")
      .then((res) => {
        setProducts(res.products);
        setTotal(res.total);
      })
      .catch(() => {
        setProducts([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    getAdminStats(token).then(setStats).catch(() => setStats(null));
  }, [token, products]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        skuFor(p).toLowerCase().includes(q)
    );
  }, [products, search]);

  const lowStockCount = useMemo(
    () => products.filter((p) => p.stock < 5).length,
    [products]
  );

  return (
    <div className="dark bg-background text-on-background font-body-md h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex h-full w-64 bg-surface-container-lowest border-r border-outline-variant flex-col py-margin-mobile gap-2 shadow-2xl z-50">
        <div className="px-6 mb-8">
          <h1 className="font-headline-lg text-2xl text-primary-container italic uppercase tracking-tighter">
            GD Admin
          </h1>
          <p className="text-on-surface-variant text-sm opacity-80">
            Manage Cleat Stock
          </p>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(item.tab)}
                    className={
                      isActive
                        ? "w-full flex items-center gap-4 bg-primary-container text-on-primary-container font-label-bold rounded-r-full mr-4 p-4 cursor-pointer"
                        : "w-full flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface p-4 transition-all hover:translate-x-2 cursor-pointer"
                    }
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="px-4 mt-auto">
          <button
            onClick={() => setAddOpen(true)}
            className="w-full bg-primary-container text-on-primary-container font-label-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-container/20 uppercase italic cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
            Add New Product
          </button>
        </div>
        <div className="px-6 mt-8 flex items-center gap-3 border-t border-outline-variant/30 pt-6">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline flex items-center justify-center text-on-surface font-label-bold uppercase">
            {(user?.email ?? "A").charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="font-label-bold text-on-surface truncate">
              {user?.email ?? "Admin"}
            </p>
            <p className="text-xs text-on-surface-variant">Lead Admin</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background relative">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4">
          <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface italic uppercase">
            {NAV_ITEMS.find((n) => n.tab === activeTab)?.label ?? "Inventory"}
          </h2>
          <div className="flex items-center gap-gutter">
            {activeTab === "inventory" && (
              <div className="relative hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search cleats..."
                  className="bg-surface-container border-none focus:ring-2 focus:ring-primary-container text-on-surface pl-10 pr-4 py-2 rounded-lg w-64 outline-none transition-all"
                />
              </div>
            )}
            <button className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="relative" ref={accountMenuRef}>
              <button
                onClick={() => setAccountMenuOpen((v) => !v)}
                className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={accountMenuOpen}
              >
                <span className="material-symbols-outlined">account_circle</span>
              </button>
              {accountMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 bg-surface-container-low border border-outline-variant/30 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-outline-variant/30">
                    <p className="font-label-bold text-on-surface truncate text-sm">
                      {user?.email ?? "Admin"}
                    </p>
                    <p className="text-xs text-on-surface-variant">Lead Admin</p>
                  </div>
                  <Link
                    to="/"
                    onClick={() => setAccountMenuOpen(false)}
                    role="menuitem"
                    className="w-full text-left px-4 py-3 text-sm font-label-bold uppercase italic text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">
                      home
                    </span>
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setAccountMenuOpen(false)}
                    role="menuitem"
                    className="w-full text-left px-4 py-3 text-sm font-label-bold uppercase italic text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-2 cursor-pointer border-b border-outline-variant/30"
                  >
                    <span className="material-symbols-outlined text-base">
                      storefront
                    </span>
                    Shop
                  </Link>
                  <button
                    onClick={handleLogout}
                    role="menuitem"
                    className="w-full text-left px-4 py-3 text-sm font-label-bold uppercase italic text-primary-container hover:bg-surface-container-highest transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">
                      logout
                    </span>
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-margin-mobile md:p-margin-desktop">
          {activeTab === "orders" && <OrdersTab token={token} />}

          {activeTab !== "inventory" && activeTab !== "orders" && (
            <div className="bg-surface-container-low rounded-xl p-12 text-center border border-outline-variant/20">
              <p className="text-on-surface-variant font-label-bold uppercase tracking-widest text-sm">
                Coming Soon
              </p>
              <p className="text-on-surface mt-2">
                The {NAV_ITEMS.find((n) => n.tab === activeTab)?.label} view is not built yet.
              </p>
            </div>
          )}

          {activeTab === "inventory" && (
          <>
          {/* Bento analytics grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
            <div className="md:col-span-2 bg-surface-container-low rounded-xl p-6 border border-outline-variant/20 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl">
                  payments
                </span>
              </div>
              <p className="text-on-surface-variant font-label-bold uppercase tracking-widest mb-2 text-xs">
                Total Sales (Monthly)
              </p>
              <div className="flex items-baseline gap-4">
                <h3 className="font-display-lg text-5xl md:text-6xl text-primary-container italic">
                  {stats
                    ? `$${stats.monthlySales.current.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "—"}
                </h3>
                {stats?.monthlySales.deltaPct !== null &&
                  stats?.monthlySales.deltaPct !== undefined && (
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        stats.monthlySales.deltaPct >= 0
                          ? "bg-primary/20 text-primary"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {stats.monthlySales.deltaPct >= 0 ? "+" : ""}
                      {stats.monthlySales.deltaPct.toFixed(1)}%
                    </span>
                  )}
              </div>
              <p className="text-on-surface-variant text-sm mt-4">
                Performance tracking against previous 30-day window.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20 shadow-xl border-l-4 border-l-primary-container">
              <p className="text-on-surface-variant font-label-bold uppercase tracking-widest mb-2 text-xs">
                Low Stock Alerts
              </p>
              <h3 className="font-headline-xl text-4xl md:text-5xl text-on-surface italic">
                {String(lowStockCount).padStart(2, "0")}
              </h3>
              <div className="mt-4 flex items-center gap-2 text-primary-container font-bold">
                <span className="material-symbols-outlined text-sm">
                  warning
                </span>
                <span className="text-xs uppercase">Action Required</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20 shadow-xl">
              <p className="text-on-surface-variant font-label-bold uppercase tracking-widest mb-2 text-xs">
                Active Orders
              </p>
              <h3 className="font-headline-xl text-4xl md:text-5xl text-on-surface italic">
                {stats
                  ? String(stats.activeOrders.total).padStart(2, "0")
                  : "—"}
              </h3>
              <p className="text-on-surface-variant text-sm mt-4 italic opacity-70">
                {stats
                  ? `${stats.activeOrders.pendingShipment} Pending Shipment`
                  : "—"}
              </p>
            </div>
          </div>

          {/* Inventory table */}
          <section className="bg-surface-container rounded-xl shadow-2xl overflow-hidden border border-outline-variant/20">
            <div className="p-6 border-b border-outline-variant/30 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
              <h3 className="font-headline-lg text-xl md:text-2xl text-on-surface uppercase italic">
                Product Inventory
              </h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-label-bold px-4 py-2 border border-outline-variant rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">filter_list</span>
                  Filter
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-label-bold px-4 py-2 border border-outline-variant rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">download</span>
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/50 text-on-surface-variant uppercase text-xs tracking-widest">
                    <th className="px-6 py-4 font-label-bold">Image</th>
                    <th className="px-6 py-4 font-label-bold">Name</th>
                    <th className="px-6 py-4 font-label-bold">Category</th>
                    <th className="px-6 py-4 font-label-bold">Stock</th>
                    <th className="px-6 py-4 font-label-bold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {loading && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-on-surface-variant"
                      >
                        Loading inventory…
                      </td>
                    </tr>
                  )}
                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-on-surface-variant"
                      >
                        No products found.
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    filtered.map((p) => {
                      const isLow = p.stock < 5;
                      return (
                        <tr
                          key={p.id}
                          className="hover:bg-surface-variant/30 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="w-16 h-12 bg-surface-container-highest rounded border border-outline-variant/30 overflow-hidden group-hover:scale-110 transition-transform">
                              {p.image_url && (
                                <img
                                  src={p.image_url}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-label-bold text-on-surface">
                              {p.name}
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              SKU: {skuFor(p)}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block bg-secondary-container text-on-surface-variant px-3 py-1 text-xs font-bold rounded">
                              {CATEGORY_LABEL[p.category]}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary-container"
                                  style={{ width: `${stockBar(p.stock)}%` }}
                                />
                              </div>
                              <span
                                className={`text-sm font-label-bold ${
                                  isLow
                                    ? "text-primary-container"
                                    : "text-on-surface"
                                }`}
                              >
                                {isLow
                                  ? `Low: ${p.stock} Left`
                                  : `${p.stock} Left`}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditing(p)}
                                className="p-2 hover:bg-surface-container-highest rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                                aria-label={`Edit ${p.name}`}
                              >
                                <span className="material-symbols-outlined text-base">
                                  edit
                                </span>
                              </button>
                              <button
                                onClick={() => setDeleting(p)}
                                className="p-2 hover:bg-primary-container/20 rounded-full text-on-surface-variant hover:text-primary-container transition-all cursor-pointer"
                                aria-label={`Delete ${p.name}`}
                              >
                                <span className="material-symbols-outlined text-base">
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-outline-variant/30 flex justify-between items-center text-sm text-on-surface-variant">
              <p>
                Showing {filtered.length} of {total} products
              </p>
              <div className="flex gap-2">
                <button className="p-2 rounded hover:bg-surface-container-highest transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-primary-container text-on-primary-container rounded font-bold">
                  1
                </button>
                <button className="p-2 rounded hover:bg-surface-container-highest transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>
          </>
          )}
        </div>

        {/* Decorative gradients */}
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-0 left-64 -z-10 w-[300px] h-[300px] bg-primary-container/5 blur-[100px] rounded-full pointer-events-none" />
      </main>

      {/* Modals */}
      {addOpen && (
        <ProductFormModal
          token={token}
          onClose={() => setAddOpen(false)}
          onSaved={() => {
            setAddOpen(false);
            fetchProducts();
          }}
        />
      )}
      {editing && (
        <ProductFormModal
          token={token}
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            fetchProducts();
          }}
        />
      )}
      {deleting && (
        <DeleteConfirmModal
          token={token}
          product={deleting}
          onClose={() => setDeleting(null)}
          onDeleted={() => {
            setDeleting(null);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
};

function OrdersTab({ token }: { token: string | null }) {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    listAllOrders(token)
      .then(setOrders)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load orders")
      )
      .finally(() => setLoading(false));
  }, [token]);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);
    const pending = orders.filter((o) => o.status === "pending").length;
    return { count: orders.length, revenue, pending };
  }, [orders]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20 shadow-xl">
          <p className="text-on-surface-variant font-label-bold uppercase tracking-widest mb-2 text-xs">
            Total Orders
          </p>
          <h3 className="font-headline-xl text-4xl md:text-5xl text-on-surface italic">
            {String(stats.count).padStart(2, "0")}
          </h3>
        </div>
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20 shadow-xl">
          <p className="text-on-surface-variant font-label-bold uppercase tracking-widest mb-2 text-xs">
            Revenue
          </p>
          <h3 className="font-headline-xl text-4xl md:text-5xl text-primary-container italic">
            ${stats.revenue.toFixed(2)}
          </h3>
        </div>
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20 shadow-xl border-l-4 border-l-primary-container">
          <p className="text-on-surface-variant font-label-bold uppercase tracking-widest mb-2 text-xs">
            Pending
          </p>
          <h3 className="font-headline-xl text-4xl md:text-5xl text-on-surface italic">
            {String(stats.pending).padStart(2, "0")}
          </h3>
        </div>
      </div>

      <section className="bg-surface-container rounded-xl shadow-2xl overflow-hidden border border-outline-variant/20">
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-headline-lg text-xl md:text-2xl text-on-surface uppercase italic">
            All Orders
          </h3>
        </div>

        {error && (
          <p className="px-6 py-4 text-primary-container font-label-bold">
            {error}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50 text-on-surface-variant uppercase text-xs tracking-widest">
                <th className="px-6 py-4 font-label-bold">Order #</th>
                <th className="px-6 py-4 font-label-bold">Customer</th>
                <th className="px-6 py-4 font-label-bold">Items</th>
                <th className="px-6 py-4 font-label-bold">Total</th>
                <th className="px-6 py-4 font-label-bold">Status</th>
                <th className="px-6 py-4 font-label-bold">Date</th>
                <th className="px-6 py-4 font-label-bold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {loading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-on-surface-variant"
                  >
                    Loading orders…
                  </td>
                </tr>
              )}
              {!loading && orders.length === 0 && !error && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-on-surface-variant"
                  >
                    No orders yet.
                  </td>
                </tr>
              )}
              {!loading &&
                orders.map((o) => {
                  const itemCount = o.items.reduce((s, i) => s + i.quantity, 0);
                  const isExpanded = expanded === o.id;
                  return (
                    <Fragment key={o.id}>
                      <tr className="hover:bg-surface-variant/30 transition-colors">
                        <td className="px-6 py-4 font-label-bold text-on-surface">
                          #{o.id}
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">
                          {o.user_email ?? "—"}
                        </td>
                        <td className="px-6 py-4 text-on-surface">
                          {itemCount}
                        </td>
                        <td className="px-6 py-4 font-label-bold text-primary-container">
                          ${Number(o.total_amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded border ${ORDER_STATUS_STYLES[o.status]}`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant text-sm">
                          {new Date(o.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() =>
                              setExpanded(isExpanded ? null : o.id)
                            }
                            className="p-2 hover:bg-surface-container-highest rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                            aria-label={
                              isExpanded ? "Collapse details" : "Expand details"
                            }
                          >
                            <span className="material-symbols-outlined text-base">
                              {isExpanded ? "expand_less" : "expand_more"}
                            </span>
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-6 py-4 bg-surface-container-low"
                          >
                            <div className="space-y-2">
                              {o.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <div>
                                    <span className="font-label-bold text-on-surface">
                                      {item.brand} {item.name}
                                    </span>
                                    <span className="text-on-surface-variant ml-2">
                                      · Size {item.size} · ×{item.quantity}
                                    </span>
                                  </div>
                                  <span className="font-label-bold text-on-surface">
                                    ${(Number(item.price) * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                              {o.stripe_payment_intent_id && (
                                <p className="text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20 font-mono">
                                  Stripe: {o.stripe_payment_intent_id}
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

interface ProductFormModalProps {
  token: string | null;
  initial?: Product;
  onClose: () => void;
  onSaved: () => void;
}

function ProductFormModal({
  token,
  initial,
  onClose,
  onSaved,
}: ProductFormModalProps) {
  const isEdit = !!initial;
  const [name, setName] = useState(initial?.name ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [category, setCategory] = useState<Product["category"]>(
    initial?.category ?? "natural-grass"
  );
  const [stock, setStock] = useState(String(initial?.stock ?? 0));
  const [sizes, setSizes] = useState((initial?.sizes ?? []).join(", "));
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [removingImage, setRemovingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeImage = async () => {
    if (!imageUrl) return;
    setError(null);
    setRemovingImage(true);
    try {
      await api("/uploads", {
        method: "DELETE",
        body: imageKey ? { key: imageKey } : { url: imageUrl },
        token,
      });
      setImageUrl("");
      setImageKey(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete image from storage"
      );
    } finally {
      setRemovingImage(false);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const body = {
      name: name.trim(),
      brand: brand.trim(),
      price: Number(price),
      category,
      stock: Number(stock) || 0,
      sizes: sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      description: description.trim() || null,
      image_url: imageUrl.trim() || null,
    };

    try {
      if (isEdit && initial) {
        await api(`/products/${initial.id}`, {
          method: "PUT",
          body,
          token,
        });
      } else {
        await api("/products", { method: "POST", body, token });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSubmitting(false);
    }
  };

  return (
    <ModalShell onClose={onClose} title={isEdit ? "Edit Product" : "Add New Product"}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Brand" required>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Price (USD)" required>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Category" required>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Product["category"])
              }
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABEL[c]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Stock">
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label='Sizes (comma-separated, e.g. "7, 8, 9")'>
            <input
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="Product Image">
          {imageUrl ? (
            <div className="flex items-center gap-4">
              <img
                src={imageUrl}
                alt="Product preview"
                className="w-24 h-24 object-cover rounded-lg border border-outline-variant/30"
              />
              <button
                type="button"
                onClick={removeImage}
                disabled={removingImage}
                className="px-3 py-1.5 text-xs uppercase tracking-widest font-label-bold rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {removingImage ? "Removing…" : "Remove"}
              </button>
            </div>
          ) : (
            <UploadButton
              endpoint="productImage"
              headers={() => ({
                Authorization: `Bearer ${token ?? ""}`,
              })}
              onClientUploadComplete={(res) => {
                const first = res?.[0];
                if (!first) return;
                const url =
                  (first.serverData as { url?: string } | undefined)?.url ??
                  first.ufsUrl;
                setImageUrl(url);
                setImageKey(first.key);
              }}
              onUploadError={(err: Error) => setError(err.message)}
              appearance={{
                button: ({ isUploading }) =>
                  `${
                    isUploading
                      ? "bg-surface-container-highest text-on-surface-variant"
                      : "bg-primary-container text-on-primary-container hover:scale-105 active:scale-95"
                  } font-label-bold uppercase italic px-5 py-2 rounded-lg text-sm transition-all`,
                container: "items-start gap-2",
                allowedContent: "text-on-surface-variant text-xs",
              }}
            />
          )}
        </Field>
        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </Field>

        {error && (
          <p className="text-primary-container text-sm font-label-bold">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-5 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-bold uppercase italic hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

interface DeleteConfirmModalProps {
  token: string | null;
  product: Product;
  onClose: () => void;
  onDeleted: () => void;
}

function DeleteConfirmModal({
  token,
  product,
  onClose,
  onDeleted,
}: DeleteConfirmModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await api(`/products/${product.id}`, { method: "DELETE", token });
      onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
      setSubmitting(false);
    }
  };

  return (
    <ModalShell onClose={onClose} title="Delete Product">
      <p className="text-on-surface-variant mb-2">
        Permanently delete this product?
      </p>
      <p className="font-label-bold text-on-surface mb-6">
        {product.name}{" "}
        <span className="text-on-surface-variant text-xs">
          (SKU: {skuFor(product)})
        </span>
      </p>
      {error && (
        <p className="text-primary-container text-sm font-label-bold mb-4">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={submitting}
          className="px-5 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={confirm}
          disabled={submitting}
          className="px-5 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-bold uppercase italic hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </ModalShell>
  );
}

interface ModalShellProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalShell({ title, onClose, children }: ModalShellProps) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-low border border-outline-variant/30 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-headline-lg text-xl md:text-2xl text-on-surface italic uppercase">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const inputCls =
  "bg-surface-container border border-outline-variant/30 focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface px-4 py-2 rounded-lg outline-none w-full transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-label-bold uppercase tracking-widest text-on-surface-variant">
        {label}
        {required && <span className="text-primary-container ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

export default Admin;
