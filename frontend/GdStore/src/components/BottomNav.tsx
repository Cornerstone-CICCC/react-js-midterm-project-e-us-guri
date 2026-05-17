import { MdHome, MdSportsSoccer, MdShoppingBag, MdPerson } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";
import { useCart } from "../contexts/cart/useCart";

const navItems = [
  { icon: MdHome, label: "Home", path: "/" },
  { icon: MdSportsSoccer, label: "Shop", path: "/shop" },
  { icon: MdShoppingBag, label: "Cart", path: "/cart" },
  { icon: MdPerson, label: "Profile", path: "/login" },
];

const BottomNav = () => {
  const location = useLocation();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant/20 shadow-[0_-4px_10px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-4">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isCart = item.path === "/cart";
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`relative flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-all ${
              isActive
                ? "text-primary-container dark:text-primary bg-primary/10"
                : "text-on-surface-variant dark:text-secondary hover:bg-surface-variant/50"
            }`}
          >
            <div className="relative">
              <item.icon size={24} />
              {isCart && cartCount > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center leading-none shadow">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <span className="font-label-bold text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
