import { loadStripe, type Stripe } from "@stripe/stripe-js";

const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// loadStripe returns a singleton promise — calling it once at module scope
// is the pattern Stripe recommends so the script is fetched a single time.
export const stripePromise: Promise<Stripe | null> = key
  ? loadStripe(key)
  : Promise.resolve(null);
