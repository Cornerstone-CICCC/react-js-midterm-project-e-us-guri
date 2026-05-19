import { 
  MdInventory2, 
  MdReceiptLong, 
  MdLeaderboard, 
  MdGroup, 
  MdSettings, 
  MdAdd 
} from "react-icons/md";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <aside className="docked left h-full w-64 bg-surface-container-low dark:bg-surface-container-lowest border-r border-outline-variant flex flex-col py-margin-mobile gap-unit shadow-2xl z-50">
      
      {/* Branding Area */}
      <div className="px-6 mb-8">
        <h1 className="font-headline-lg text-primary-container italic uppercase tracking-tighter text-2xl">
          GD Admin
        </h1>
        <p className="text-on-surface-variant text-sm opacity-80 font-body-md">
          Manage Cleat Stock
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-1">
          <li>
            <a 
              className="flex items-center gap-4 bg-primary-container text-on-primary-container font-label-bold rounded-r-full mr-4 p-4 transition-all shadow-lg shadow-primary-container/20" 
              href="#"
            >
              <MdInventory2 size={24} />
              <span className="font-bold">Inventory</span>
            </a>
          </li>
          
          <NavItem icon={<MdReceiptLong size={24} />} label="Orders" />
          <NavItem icon={<MdLeaderboard size={24} />} label="Analytics" />
          <NavItem icon={<MdGroup size={24} />} label="Customers" />
          <NavItem icon={<MdSettings size={24} />} label="Settings" />
        </ul>
      </nav>

      {/* Bottom Action Button */}
      <div className="px-4 mt-auto">
        <button className="w-full bg-primary-container text-on-primary-container font-label-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-container/20 uppercase italic font-bold">
          <MdAdd size={22} />
          Add New Product
        </button>
      </div>

      {/* Admin User Profile Section */}
      <div className="px-6 mt-8 flex items-center gap-3 border-t border-outline-variant/30 pt-6">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline">
          <img 
            alt="Admin Avatar" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLPgGLfCHlpvfjyPZtZwfumPL6sJLK8xHcbtqAm_Eeyc_BxyG7R2axcBj4j5pMvG80Ufd3vyCi_h5nIdq8lPubTAlTGzHyrYGANa-ReKlBi7L8bbNvhaEMJeyKdpyKccWY2WTxZa-XV7_ywLsRrRqFeK20q7PwahZeV6yTqazfJh9izuLZz5SK4HnH0A3SRDnE3eWkM1Y43LzgC12ACji8xSypY-iFoSHfhh7xdCNln-TOrgHhhaoR3Re-Gbxpx1yDJlLdPc2Sw6ha"
          />
        </div>
        <div>
          <p className="font-label-bold text-on-surface text-sm font-bold">Alex Rossi</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Lead Admin</p>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <li>
    <a 
      className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface p-4 transition-all hover:translate-x-2 rounded-r-full mr-4" 
      href="#"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  </li>
);

export default SideNav;