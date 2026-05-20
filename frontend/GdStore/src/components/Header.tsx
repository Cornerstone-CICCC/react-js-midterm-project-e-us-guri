import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSearch, IoMoon } from "react-icons/io5";
import { PiSun } from "react-icons/pi";
import { useTheme } from "../contexts/theme/ThemeContext";
import { useAuth } from "../contexts/auth/AuthContext";
import { useCart } from "../contexts/cart/useCart";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/login", { replace: true });
  };

  const getNavLinkClass = (path: string) => {
    const baseClass = "font-bold hover:scale-105 transition-all duration-300 active:scale-95 ";
    if (location.pathname === path) {
      return baseClass + "text-primary border-b-2 border-primary";
    }
    return baseClass + "text-on-surface-variant dark:text-secondary hover:text-primary";
  };

  return (
    <header className="bg-background dark:bg-background border-b border-outline-variant/30 shadow-md z-50 flex justify-between items-center px-6 md:px-12 py-4 w-full transition-colors duration-500">

      {/* LOGO: */}
      <Link to="/" className="cursor-pointer">
        <img
          src="/images/gdstore-logo.png"
          alt="GD STORE"
          className="w-16 object-contain"
        />
      </Link>

      {/* NAVIGATION: */}
      <nav className="hidden md:flex gap-8">
        <Link className={getNavLinkClass("/")} to="/">Home</Link>
        <Link className={getNavLinkClass("/shop")} to="/shop">Shop</Link>
      </nav>

      {/* RIGHT SIDE: */}
      <div className="flex items-center gap-6">

        {/* SEARCH: */}
        <div className="hidden lg:flex items-center bg-surface-container-high rounded-full px-4 py-2 border border-outline-variant/30 transition-all duration-500">
          <IoSearch size={18} />
          <input
            className="bg-transparent border-none outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/50 w-48 ml-2"
            placeholder="Search cleats..."
            type="text"
          />
        </div>

        {/* CART: */}
        <Link
          to="/cart"
          className="relative text-primary hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center"
        >
          <MdOutlineShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center leading-none shadow">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>

        {/* PROFILE + DROPDOWN: */}
        <div className="border-r-2 border-outline-variant/30 dark:border-black pr-4 relative" ref={dropdownRef}>
          <button
            onClick={() => {
              if (user) {
                setDropdownOpen((prev) => !prev);
              } else {
                navigate("/login");
              }
            }}
            className="text-primary hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center cursor-pointer"
          >
            <CgProfile size={24} />
          </button>

          {/* Dropdown */}
          {dropdownOpen && user && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-surface-container-high border border-outline-variant/30 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-outline-variant/20">
                <p className="text-sm font-bold text-on-surface truncate">
                  {user.email}
                </p>
                <p className="text-xs text-on-surface-variant capitalize">
                  {user.role}
                </p>
              </div>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-3 text-sm text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer border-b border-outline-variant/20"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        {/* THEME TOGGLE:*/}
        <button
          onClick={toggleDarkMode}
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-surface-container-high border border-outline-variant/30 hover:scale-110 active:scale-95 transition-all duration-500 overflow-hidden cursor-pointer"
        >
          <div className={`absolute transition-all duration-500 ${darkMode ? "rotate-0 opacity-100 scale-100" : "rotate-90 opacity-0 scale-0"}`}>
            <PiSun size={22} className="text-primary" />
          </div>
          <div className={`absolute transition-all duration-500 ${darkMode ? "-rotate-90 opacity-0 scale-0" : "rotate-0 opacity-100 scale-100"}`}>
            <IoMoon size={22} className="text-primary" />
          </div>
        </button>

      </div>
    </header>
  );
};

export default Header;