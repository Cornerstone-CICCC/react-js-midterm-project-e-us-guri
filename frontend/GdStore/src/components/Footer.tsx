import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp} from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest dark:bg-background border-t border-outline-variant/10 py-16 px-margin-mobile md:px-margin-desktop transition-colors duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          {}
          <div className="font-headline-xl text-primary-container dark:text-primary italic tracking-tighter mb-6">
            GD STORE
          </div>

          <p className="text-on-surface-variant dark:text-secondary text-sm">
            The world's premium destination for elite soccer footwear and
            performance technology.
          </p>
        </div>

        <div>
          <h4 className="font-label-bold text-on-surface dark:text-on-background uppercase mb-6">
            Shop
          </h4>

          <ul className="space-y-4 text-on-surface-variant dark:text-secondary text-sm">
            <li><Link className="hover:text-primary transition-colors" to="/category/natural-grass">Natural Grass</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/category/artificial-grass">Artificial Grass</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/category/futsal">Futsal</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/shop">All Cleats</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-bold text-on-surface dark:text-on-background uppercase mb-6">
            Help
          </h4>

          <ul className="space-y-4 text-on-surface-variant dark:text-secondary text-sm">
            <li><a className="hover:text-primary transition-colors" href="#">Shipping & Returns</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Sizing Guide</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Order Tracking</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
          </ul>
        </div>

        <div>
      <h4 className="font-label-bold text-on-surface dark:text-on-background uppercase mb-6">
        Follow Us
      </h4>

      <div className="flex gap-4">
        {/* Instagram */}
        <a
          className="w-10 h-10 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center hover:bg-primary-container transition-colors group"
          href="https://www.instagram.com/gdstoreoficial_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram 
            size={20} 
            className="text-on-surface dark:text-primary group-hover:text-white transition-colors" 
          />
        </a>

        {/* WhatsApp */}
        <a
          className="w-10 h-10 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center hover:bg-primary-container transition-colors group"
          href="https://w.app/gdstore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp 
            size={20} 
            className="text-on-surface dark:text-primary group-hover:text-white transition-colors" 
          />
        </a>

        {/* Facebook */}
        <a
          className="w-10 h-10 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center hover:bg-primary-container transition-colors group"
          href="https://www.facebook.com/diego.pacheco.7906932"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook
            size={18} 
            className="text-on-surface dark:text-primary group-hover:text-white transition-colors" 
          />
        </a>
      </div>
    </div>
      </div>

      <div
        className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-label-bold text-on-surface-variant/40 dark:text-secondary/40"
      >
        <p>© {new Date().getFullYear()} | GD STORE. ALL RIGHTS RESERVED.</p>

        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Use</a>
          <a className="hover:text-primary transition-colors" href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;