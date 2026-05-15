import React from 'react';
import SideNav from '../components/SideNav';
import StatCard from '../components/StatCard';
import { MdSearch, MdNotifications, MdAccountCircle } from 'react-icons/md';

const AdminDashboard = () => {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex overflow-hidden dark">
      <SideNav />

      <main className="flex-1 overflow-y-auto bg-background relative">
        {/* Header Area */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-margin-desktop py-4 w-full">
          <h2 className="font-headline-lg text-on-surface italic uppercase text-3xl">Inventory</h2>
          <div className="flex items-center gap-gutter">
            <div className="relative hidden md:block">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl" />
              <input 
                className="bg-surface-container border-none border-b-2 border-transparent focus:border-primary-container focus:ring-0 text-on-surface pl-10 pr-4 py-2 rounded-t-lg w-64 transition-all" 
                placeholder="Search cleats..." 
                type="text"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="text-on-surface-variant hover:text-primary transition-colors hover:scale-110">
                <MdNotifications size={24} />
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors hover:scale-110">
                <MdAccountCircle size={24} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-margin-desktop">
          {/* Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
            <StatCard 
              title="Total Sales (Monthly)" 
              value="$124,500" 
              trend="+14.2%" 
              icon="payments" 
              isMain 
            />
            <StatCard 
              title="Low Stock Alerts" 
              value="08" 
              alert 
              icon="warning" 
            />
            <StatCard 
              title="Active Orders" 
              value="42" 
              subtitle="12 Pending Shipment" 
            />
          </div>

        </div>

        {/* Decoration Gradients */}
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      </main>
    </div>
  );
};

export default AdminDashboard;