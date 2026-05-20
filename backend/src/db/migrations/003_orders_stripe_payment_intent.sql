-- ============================================================
-- Migration: add stripe_payment_intent_id to orders
-- ============================================================
-- Links a Stripe charge to its order row so we can:
--   - issue refunds from the admin UI (call stripe.refunds.create
--     with this id),
--   - reconcile a charge in the Stripe dashboard back to an order,
--   - reject duplicate /api/orders/checkout calls for the same
--     PaymentIntent (the UNIQUE constraint enforces this).
--
-- NULL is allowed so older orders (and any future non-Stripe paths)
-- don't break. Postgres UNIQUE permits multiple NULLs.
-- ============================================================

BEGIN;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255);

ALTER TABLE orders
  DROP CONSTRAINT IF EXISTS orders_stripe_payment_intent_id_key;

ALTER TABLE orders
  ADD CONSTRAINT orders_stripe_payment_intent_id_key
  UNIQUE (stripe_payment_intent_id);

COMMIT;
