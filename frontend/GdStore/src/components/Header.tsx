import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
  <header className="bg-background/80 dark:bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-md docked full-width top-0 z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full">
    
    <div className="font-headline-xl text-headline-lg text-primary-container dark:text-primary tracking-tighter italic">
    GD STORE
    </div>

  <nav className="hidden md:flex gap-8">
    <a
      className="text-primary-container dark:text-primary font-label-bold border-b-2 border-primary-container hover:scale-105 transition-transform duration-200 active:scale-95"
      href="#"
    >
      Firm Ground
    </a>

    <a
      className="text-on-surface-variant dark:text-secondary font-label-bold hover:text-primary hover:scale-105 transition-transform duration-200 active:scale-95"
      href="#"
    >
      Soft Ground
    </a>

    <a
      className="text-on-surface-variant dark:text-secondary font-label-bold hover:text-primary hover:scale-105 transition-transform duration-200 active:scale-95"
      href="#"
    >
      Turf
    </a>
  </nav>

  <div className="flex items-center gap-6">
    <div
      className="hidden lg:flex items-center bg-surface-container-high rounded-full px-4 py-2 border border-outline-variant/30"
    >
      <span className="material-symbols-outlined text-on-surface-variant">
        search
      </span>

      <input
        className="bg-transparent border-none focus:ring-0 text-body-md text-on-surface placeholder:text-on-surface-variant/50 w-48"
        placeholder="Search cleats..."
        type="text"
      />
    </div>

    <button className="text-primary hover:scale-110 transition-transform">
      <span><MdOutlineShoppingCart /> </span>
    </button>

    <button className="text-primary hover:scale-110 transition-transform">
      <span><CgProfile /> </span>
    </button>
  </div>
</header>
  )
}

export default Header