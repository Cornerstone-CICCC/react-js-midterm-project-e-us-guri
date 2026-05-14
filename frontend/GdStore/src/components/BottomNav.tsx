import { MdHome, MdSportsSoccer, MdShoppingBag, MdPerson } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { icon: MdHome, label: "Home", path: "/" },
  { icon: MdSportsSoccer, label: "Shop", path: "/shop" },
  { icon: MdShoppingBag, label: "Cart", path: "/cart" },
  { icon: MdPerson, label: "Profile", path: "/login" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant/20 shadow-[0_-4px_10px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-4">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-all ${
              isActive
                ? "text-primary-container dark:text-primary bg-primary/10"
                : "text-on-surface-variant dark:text-secondary hover:bg-surface-variant/50"
            }`}
          >
            <item.icon size={24} />
            <span className="font-label-bold text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
