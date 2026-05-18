import { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { Appearance, StripeElementsOptions } from "@stripe/stripe-js";
import { MdClose, MdLock } from "react-icons/md";
import { stripePromise } from "../lib/stripe";
import { createPaymentIntent } from "../services/paymentsService";
import { checkoutOrder, type Order } from "../services/ordersService";
import { useAuth } from "../contexts/auth/AuthContext";
import { useCart } from "../contexts/cart/useCart";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

// Outer shell: fetches a client_secret, renders <Elements> when ready.
export function CheckoutModal({ open, onClose, onSuccess }: CheckoutModalProps) {
  const { token } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setClientSecret(null);
    setError(null);
    setLoading(true);
    createPaymentIntent(token)
      .then((res) => {
        setClientSecret(res.clientSecret);
        setAmount(res.amount);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to start checkout")
      )
      .finally(() => setLoading(false));
  }, [open, token]);

  if (!open) return null;

  const appearance: Appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#e61e2a",
      colorBackground: "#1c1b1f",
      colorText: "#e6e1e5",
      colorDanger: "#e61e2a",
      fontFamily: "system-ui, sans-serif",
      borderRadius: "6px",
    },
  };

  const options: StripeElementsOptions | undefined = clientSecret
    ? { clientSecret, appearance }
    : undefined;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-low border border-outline-variant/30 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
          <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface italic uppercase">
            Secure Checkout
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors cursor-pointer"
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {loading && (
            <p className="text-on-surface-variant text-sm">
              Preparing your payment…
            </p>
          )}
          {error && (
            <p className="text-primary-container text-sm font-label-bold">
              {error}
            </p>
          )}
          {options && clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <PaymentForm
                amount={amount ?? 0}
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

interface PaymentFormProps {
  amount: number;
  onSuccess: (order: Order) => void;
  onClose: () => void;
}

// Inner form: lives inside <Elements> so it can use useStripe/useElements.
function PaymentForm({ amount, onSuccess, onClose }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAuth();
  const { refresh } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    // Confirm the payment in-place. `redirect: 'if_required'` keeps the
    // user on this page unless the payment method demands a redirect
    // (e.g. some 3DS flows or non-card methods).
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/cart",
      },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status !== "succeeded") {
      setError(`Payment ${paymentIntent?.status ?? "did not complete"}.`);
      setSubmitting(false);
      return;
    }

    // Payment succeeded — finalize the order in our DB.
    try {
      const order = await checkoutOrder(token, paymentIntent.id);
      await refresh();
      onSuccess(order);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Payment succeeded but order creation failed: ${err.message}`
          : "Payment succeeded but order creation failed"
      );
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <p className="text-primary-container text-sm font-label-bold">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || submitting}
        className="w-full bg-primary-container text-on-primary-container py-4 font-headline-lg italic uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_4px_20px_rgba(230,30,42,0.4)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {submitting ? "Processing…" : `Pay $${(amount / 100).toFixed(2)}`}
      </button>

      <button
        type="button"
        onClick={onClose}
        disabled={submitting}
        className="w-full py-3 border border-outline-variant text-on-surface-variant font-label-bold uppercase tracking-widest text-xs hover:bg-surface-variant transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      <div className="flex items-center justify-center gap-2 text-on-surface-variant opacity-60">
        <MdLock className="text-sm" />
        <span className="text-[10px] uppercase font-label-bold tracking-widest">
          Powered by Stripe
        </span>
      </div>
    </form>
  );
}
