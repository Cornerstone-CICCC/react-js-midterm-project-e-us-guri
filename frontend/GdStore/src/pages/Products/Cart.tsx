import { MdBolt, MdLocalShipping, MdArrowForward, MdLock } from "react-icons/md";
import CartItem from "../../components/CartItem";

export default function Cart() {
  return (
    <main className="min-h-screen px-margin-mobile md:px-margin-desktop py-section-gap max-w-screen-2xl mx-auto">
      {/* Page Title */}
      <div className="mb-12">
        <h1 className="font-headline-xl text-4xl md:text-7xl uppercase italic tracking-tighter">
          Your <span className="text-primary-container">Arsenal</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant mt-2 max-w-xl">
          Review your gear before heading to the pitch. Engineered for speed, built for the win.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16">
        {/* Left Side: Cart Items */}
        <section className="lg:col-span-8 space-y-gutter">
          <CartItem 
            name="Mercurial Vapour Elite"
            category="Firm Ground / Crimson Bolt"
            price={249.99}
            quantity={1}
            size="10.5 US"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBtRz3_dTeSAH2ZHl4pMDxPyx-KEemQWIi1q9soma-yccD7xMTBBHppqEKgiZ79BWoTmwI7cU33ThdRwLtTkM1fegX5oT9Azx8LS8K3zcMQEkK1i_ID7GKssl5K3ae_pMH_BP8h9tMtfzFrzSSiEek5k5AX-ZQmAUHBAG56yN0nomcDjZ7rMtYb0BdWnw9BXkAazWiegDneKiDioWPUhu8BLb2GAWukHUATIaMy1wYRrJfPQ4zy2zqugiyhZabjSX22lGJEl6ERDuug"
          />

          <CartItem 
            name="Predator Mutator 20+"
            category="Soft Ground / Carbon Black"
            price={210.00}
            quantity={1}
            size="11 US"
            borderClass="border-outline-variant"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuC--A_TriphYL7B0kcJvdLK_qvj2RcnaMXTUUSAx5xf_DPZ0hu7_TqFZ4X-Sm1sEg7cTxHoMr6d9fak-Getsv5tao3fgJ4ONGpP6QBXQRUB4OH1a-5Y8IbT6eszBDNc9IKW7vvBY41L9TgccjTp0fk1e4qSSczDqiiHWB7zrKlzMdNB0zlcnoE_nxhPgeeSLhOE02fi8vtLZFDr4bebgVk-iW5OekD3AygOxfTVW9Z6wj-QosNggzo2xB_QITW33niPvkHTIK-gu_Yo"
          />

          {/* Upsell Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter pt-8">
            <div className="bg-gradient-to-br from-surface-container-high to-surface-container p-8 rounded-xl flex flex-col justify-center border border-outline-variant/20 group overflow-hidden relative">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <MdBolt className="text-[120px]" />
              </div>
              <h4 className="font-headline-lg italic uppercase text-primary">Need Grip?</h4>
              <p className="text-on-surface-variant mt-2 mb-6">Add GD Elite Grip Socks to your order and save 20%.</p>
              <button className="w-fit px-6 py-2 bg-surface-container-highest text-on-surface font-label-bold uppercase border border-primary-container/40 hover:bg-primary-container hover:text-on-primary-container transition-all">
                Add to bag
              </button>
            </div>

            <div className="bg-gradient-to-br from-surface-container-high to-surface-container p-8 rounded-xl border border-outline-variant/20 flex items-center gap-6">
              <div className="bg-primary-container/10 p-4 rounded-full">
                <MdLocalShipping className="text-primary-container text-4xl" />
              </div>
              <div>
                <h4 className="font-headline-lg italic uppercase text-on-surface">Fast Track</h4>
                <p className="text-on-surface-variant">Free Express Shipping applied to your order.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Order Summary */}
        <aside className="lg:col-span-4">
          <div className="bg-surface-container-low p-8 border border-outline-variant/20 shadow-2xl sticky top-32">
            <h2 className="font-headline-lg italic uppercase border-b border-outline-variant/30 pb-4 mb-6">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-on-surface">$459.99</span>
              </div>
              <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                <span>Shipping</span>
                <span className="text-primary-container">FREE</span>
              </div>
              <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                <span>Estimated Tax</span>
                <span className="text-on-surface">$36.80</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-primary-container flex justify-between items-end">
              <span className="font-headline-lg italic uppercase">Total</span>
              <div className="text-right">
                <span className="font-display-lg text-4xl md:text-5xl text-primary-container leading-none">$496.79</span>
              </div>
            </div>

            <button className="w-full mt-10 bg-primary-container text-on-primary-container py-5 font-headline-lg italic uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 group shadow-[0_4px_20px_rgba(230,30,42,0.4)]">
              Checkout with Stripe
              <MdArrowForward className="transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-8 flex flex-col items-center gap-4 text-on-surface-variant">
              <div className="flex items-center gap-2 opacity-60">
                <MdLock className="text-sm" />
                <span className="text-[10px] uppercase font-label-bold tracking-widest">Secure Payment Processing</span>
              </div>
              {/* Payment Icons */}
              <div className="flex gap-4 opacity-40">
                <img alt="Visa" className="h-4 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" />
                <img alt="Mastercard" className="h-4 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" />
                <img alt="Stripe" className="h-4 grayscale" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" />
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-8 pt-8 border-t border-outline-variant/20">
              <label className="font-label-bold uppercase text-xs text-on-surface-variant block mb-2">Promotional Code</label>
              <div className="flex gap-2">
                <input 
                  className="bg-surface-container-highest border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface w-full font-label-bold uppercase transition-colors p-2" 
                  placeholder="ENTER CODE" 
                  type="text"
                />
                <button className="bg-surface-container-highest px-4 py-2 font-label-bold uppercase hover:bg-on-surface-variant/20 transition-colors">Apply</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
