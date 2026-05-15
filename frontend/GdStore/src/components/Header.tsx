import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSearch, IoMoon } from "react-icons/io5";
import { PiSun } from "react-icons/pi";
import { useTheme } from "../contexts/theme/ThemeContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-background dark:bg-background border-b border-outline-variant/30 shadow-md z-50 flex justify-between items-center px-6 md:px-12 py-4 w-full transition-colors duration-500">

      {/* LOGO: */}
      <div>
        <img
          src="/images/gdstore-logo.png"
          alt="GD STORE"
          className="w-16 object-contain"
        />
      </div>

      {/* NAVIGATION: (Mantido igual) */}
      <nav className="hidden md:flex gap-8">
        <a className="text-primary-container dark:text-primary font-bold border-b-2 border-primary-container hover:scale-105 transition-all duration-300 active:scale-95" href="#">Home</a>
        <a className="text-on-surface-variant dark:text-secondary font-bold hover:text-primary hover:scale-105 transition-all duration-300 active:scale-95" href="#">Artificial Grass</a>
        <a className="text-on-surface-variant dark:text-secondary font-bold hover:text-primary hover:scale-105 transition-all duration-300 active:scale-95" href="#">Natural Grass</a>
        <a className="text-on-surface-variant dark:text-secondary font-bold hover:text-primary hover:scale-105 transition-all duration-300 active:scale-95" href="#">Futsal</a>
      </nav>

      {/* RIGHT SIDE */}
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

        {/* CART:*/}
        <Link 
          to="/products/cart" 
          className="text-primary hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center"
        >
          <MdOutlineShoppingCart size={24} />
        </Link>

        {/* PROFILE: */}
        <div className="border-r-2 border-outline-variant/30 dark:border-black pr-4 ">
          <Link 
            to="/login"
            className="text-primary hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center">
              <CgProfile size={24} />
          </Link>
        </div>

        {/* THEME TOGGLE:*/}
        <button
          onClick={toggleDarkMode}
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-surface-container-high border border-outline-variant/30 hover:scale-110 active:scale-95 transition-all duration-500 overflow-hidden"
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