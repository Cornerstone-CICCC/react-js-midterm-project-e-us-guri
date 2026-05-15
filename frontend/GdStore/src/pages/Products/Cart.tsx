import { MdBolt, MdLocalShipping, MdArrowForward, MdLock, MdAdd, MdRemove, MdDelete } from "react-icons/md";

// Componente Interno para o Item do Carrinho
const CartItem = ({ name, category, price, image, size, quantity, borderClass = "border-primary-container" }: any) => (
  <div className={`group relative bg-surface-container dark:bg-surface-container border-l-4 ${borderClass} p-6 shadow-xl transition-all duration-300 hover:bg-surface-container-high flex flex-col md:flex-row gap-6`}>
    <div className="w-full md:w-48 h-48 bg-surface-container-highest overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline-lg text-on-surface italic uppercase">{name}</h3>
            <p className="text-on-surface-variant text-sm font-label-bold uppercase tracking-widest mt-1">{category}</p>
          </div>
          <p className="font-headline-lg text-primary-container dark:text-primary">${price.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="bg-surface-container-highest px-3 py-1 flex items-center gap-4 rounded-lg">
            <button className="text-primary-container dark:text-primary hover:opacity-70 transition-colors"><MdRemove /></button>
            <span className="font-label-bold text-on-surface">{quantity}</span>
            <button className="text-primary-container dark:text-primary hover:opacity-70 transition-colors"><MdAdd /></button>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-bold uppercase text-xs">
            Size: {size}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors font-label-bold text-xs uppercase">
          <MdDelete className="text-lg" /> Remove Item
        </button>
      </div>
    </div>
  </div>
);

export default function Cart() {
  return (
    <div className="bg-background text-on-background transition-colors duration-500">
      <main className="min-h-screen px-margin-mobile md:px-margin-desktop py-section-gap max-w-screen-2xl mx-auto">
        
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-headline-xl text-4xl md:text-7xl uppercase italic tracking-tighter text-on-background">
            Your <span className="text-primary-container dark:text-primary">Arsenal</span>
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

            {/* Upsell Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter pt-8">
              <div className="bg-gradient-to-br from-surface-container-high to-surface-container p-8 rounded-xl flex flex-col justify-center border border-outline-variant/20 group overflow-hidden relative">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <MdBolt className="text-[120px] text-primary" />
                </div>
                <h4 className="font-headline-lg italic uppercase text-primary-container dark:text-primary">Need Grip?</h4>
                <p className="text-on-surface-variant mt-2 mb-6">Add GD Elite Grip Socks to your order and save 20%.</p>
                <button className="w-fit px-6 py-2 bg-surface-container-highest text-on-surface font-label-bold uppercase border border-primary-container/40 hover:bg-primary-container hover:text-on-primary-container transition-all">
                  Add to bag
                </button>
              </div>

              <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/20 flex items-center gap-6">
                <div className="bg-primary-container/10 p-4 rounded-full">
                  <MdLocalShipping className="text-primary-container dark:text-primary text-4xl" />
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
            <div className="bg-surface-container-low p-8 border border-outline-variant/20 shadow-2xl sticky top-32 transition-colors duration-500">
              <h2 className="font-headline-lg italic uppercase border-b border-outline-variant/30 pb-4 mb-6 text-on-surface">Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface">$459.99</span>
                </div>
                <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="text-primary-container dark:text-primary">FREE</span>
                </div>
                <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                  <span>Estimated Tax</span>
                  <span className="text-on-surface">$36.80</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-primary-container flex justify-between items-end">
                <span className="font-headline-lg italic uppercase text-on-surface">Total</span>
                <div className="text-right">
                  <span className="font-display-lg text-4xl md:text-5xl text-primary-container dark:text-primary leading-none">$496.79</span>
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
                <div className="flex gap-4 opacity-40 dark:opacity-60 grayscale">
                   {/* Ícones de pagamento - a classe dark:invert pode ajudar se os logos forem pretos */}
                   <img alt="Visa" className="h-4 dark:brightness-200" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" />
                   <img alt="Mastercard" className="h-4 dark:brightness-200" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" />
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-8 pt-8 border-t border-outline-variant/20">
                <label className="font-label-bold uppercase text-xs text-on-surface-variant block mb-2">Promotional Code</label>
                <div className="flex gap-2">
                  <input 
                    className="bg-surface-container-highest border-b-2 border-outline-variant focus:border-primary-container dark:focus:border-primary focus:ring-0 text-on-surface w-full font-label-bold uppercase transition-colors p-2 outline-none" 
                    placeholder="ENTER CODE" 
                    type="text"
                  />
                  <button className="bg-surface-container-highest text-on-surface px-4 py-2 font-label-bold uppercase hover:bg-on-surface-variant/20 transition-colors">Apply</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}