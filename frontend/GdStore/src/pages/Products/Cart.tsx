import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { MdBolt, MdLocalShipping, MdArrowForward, MdLock, MdAdd, MdRemove, MdDelete, MdCheckCircle } from "react-icons/md";
import { useCart } from "../../contexts/cart/useCart";
import { useAuth } from "../../contexts/auth/AuthContext";
import { CATEGORY_LABEL } from "../../services/productsService";
import type { CartItem as CartItemType } from "../../services/cartService";
import { CheckoutModal } from "../../components/CheckoutModal";
import type { Order } from "../../services/ordersService";

interface CartLineProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
}

const CartLine = memo(({ item, onUpdateQuantity, onRemove }: CartLineProps) => (
  <div className="group relative bg-surface-container dark:bg-surface-container border-l-4 border-primary-container p-6 shadow-xl transition-all duration-300 hover:bg-surface-container-high flex flex-col md:flex-row gap-6">
    <div className="w-full md:w-48 h-48 bg-surface-container-highest overflow-hidden">
      {item.image_url && (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      )}
    </div>
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline-lg text-on-surface italic uppercase">{item.name}</h3>
            <p className="text-on-surface-variant text-sm font-label-bold uppercase tracking-widest mt-1">
              {item.brand} · {CATEGORY_LABEL[item.category]}
            </p>
          </div>
          <p className="font-headline-lg text-primary-container dark:text-primary">
            ${(Number(item.price) * item.quantity).toFixed(2)}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="bg-surface-container-highest px-3 py-1 flex items-center gap-4 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              className="text-primary-container dark:text-primary hover:opacity-70 transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <MdRemove />
            </button>
            <span className="font-label-bold text-on-surface">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="text-primary-container dark:text-primary hover:opacity-70 transition-colors cursor-pointer"
            >
              <MdAdd />
            </button>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-bold uppercase text-xs">
            Size: {item.size}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary-container transition-colors font-label-bold text-xs uppercase cursor-pointer"
        >
          <MdDelete className="text-lg" /> Remove Item
        </button>
      </div>
    </div>
  </div>
));

export default function Cart() {
  const { user } = useAuth();
  const { items, total, loading, error, updateQuantity, removeItem } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = total;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  return (
    <div className="bg-background text-on-background transition-colors duration-500">
      <main className="min-h-screen px-margin-mobile md:px-margin-desktop py-section-gap max-w-screen-2xl mx-auto">
        <div className="mb-12">
          <h1 className="font-headline-xl text-4xl md:text-7xl uppercase italic tracking-tighter text-on-background">
            Your <span className="text-primary-container dark:text-primary">Arsenal</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-2 max-w-xl">
            Review your gear before heading to the pitch. Engineered for speed, built for the win.
          </p>
        </div>

        {completedOrder && (
          <div className="mb-8 bg-primary/10 border border-primary/40 rounded-xl p-6 flex items-start gap-4">
            <MdCheckCircle className="text-primary text-3xl shrink-0 mt-0.5" />
            <div>
              <h3 className="font-headline-lg italic uppercase text-on-surface">
                Order #{completedOrder.id} Confirmed
              </h3>
              <p className="text-on-surface-variant text-sm mt-1">
                Total ${Number(completedOrder.total_amount).toFixed(2)}. We'll
                send tracking details to your email.
              </p>
            </div>
          </div>
        )}

        {!user ? (
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-12 text-center space-y-4">
            <p className="text-on-surface-variant">
              Sign in to view your cart.
            </p>
            <Link
              to="/login"
              className="inline-block bg-primary-container text-on-primary-container px-6 py-3 font-label-bold uppercase italic cursor-pointer"
            >
              Sign In
            </Link>
          </div>
        ) : loading ? (
          <p className="text-on-surface-variant">Loading your cart…</p>
        ) : error ? (
          <p className="text-primary-container font-label-bold">{error}</p>
        ) : items.length === 0 ? (
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-12 text-center space-y-4">
            <p className="text-on-surface-variant">Your arsenal is empty.</p>
            <Link
              to="/shop"
              className="inline-block bg-primary-container text-on-primary-container px-6 py-3 font-label-bold uppercase italic cursor-pointer"
            >
              Browse Cleats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16">
            <section className="lg:col-span-8 space-y-gutter">
              {items.map((item) => (
                <CartLine
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter pt-8">
                <div className="bg-gradient-to-br from-surface-container-high to-surface-container p-8 rounded-xl flex flex-col justify-center border border-outline-variant/20 group overflow-hidden relative">
                  <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <MdBolt className="text-[120px] text-primary" />
                  </div>
                  <h4 className="font-headline-lg italic uppercase text-primary-container dark:text-primary">
                    Need Grip?
                  </h4>
                  <p className="text-on-surface-variant mt-2 mb-6">
                    Add GD Elite Grip Socks to your order and save 20%.
                  </p>
                  <button className="w-fit px-6 py-2 bg-surface-container-highest text-on-surface font-label-bold uppercase border border-primary-container/40 hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer">
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

            <aside className="lg:col-span-4">
              <div className="bg-surface-container-low p-8 border border-outline-variant/20 shadow-2xl sticky top-32 transition-colors duration-500">
                <h2 className="font-headline-lg italic uppercase border-b border-outline-variant/30 pb-4 mb-6 text-on-surface">
                  Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="text-on-surface">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                    <span>Shipping</span>
                    <span className="text-primary-container dark:text-primary">FREE</span>
                  </div>
                  <div className="flex justify-between font-label-bold uppercase text-on-surface-variant">
                    <span>Estimated Tax</span>
                    <span className="text-on-surface">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-primary-container flex justify-between items-end">
                  <span className="font-headline-lg italic uppercase text-on-surface">Total</span>
                  <div className="text-right">
                    <span className="font-display-lg text-4xl md:text-5xl text-primary-container dark:text-primary leading-none">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full mt-10 bg-primary-container text-on-primary-container py-5 font-headline-lg italic uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 group shadow-[0_4px_20px_rgba(230,30,42,0.4)] cursor-pointer"
                >
                  Checkout
                  <MdArrowForward className="transition-transform group-hover:translate-x-1" />
                </button>

                <div className="mt-8 flex flex-col items-center gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-2 opacity-60">
                    <MdLock className="text-sm" />
                    <span className="text-[10px] uppercase font-label-bold tracking-widest">Secure Payment Processing</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={(order) => {
          setCheckoutOpen(false);
          setCompletedOrder(order);
        }}
      />
    </div>
  );
}
