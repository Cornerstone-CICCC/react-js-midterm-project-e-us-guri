-- ============================================================
-- Migration: products.id SERIAL -> UUID, collapse categories to 3
-- ============================================================
-- WARNING: destructive. Wipes products, cart_items, and order_items.
-- Cart and order rows that no longer have product references are wiped
-- along with them. For a midterm dev DB this is fine; for prod, write a
-- preserving migration that backfills product_id values first.
--
-- New category set (was: firm-ground / soft-ground / turf / indoor):
--   - artificial-grass  (formerly: turf)
--   - natural-grass     (formerly: firm-ground, soft-ground)
--   - futsal            (formerly: indoor)
-- ============================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Wipe rows whose product_id type or category values won't survive.
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
DELETE FROM carts;
DELETE FROM products;

-- 2. Drop FKs that reference products.id (so we can change its type).
ALTER TABLE cart_items  DROP CONSTRAINT IF EXISTS cart_items_product_id_fkey;
ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;

-- 3. Switch products.id from SERIAL/integer to UUID.
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE products ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS products_id_seq;

ALTER TABLE products
  ALTER COLUMN id TYPE UUID USING gen_random_uuid(),
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE products ADD PRIMARY KEY (id);

-- 4. Switch the FK columns to UUID. Tables are empty after step 1.
ALTER TABLE cart_items  ALTER COLUMN product_id TYPE UUID USING product_id::text::uuid;
ALTER TABLE order_items ALTER COLUMN product_id TYPE UUID USING product_id::text::uuid;

ALTER TABLE cart_items
  ADD CONSTRAINT cart_items_product_id_fkey
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

ALTER TABLE order_items
  ADD CONSTRAINT order_items_product_id_fkey
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;

-- 5. Replace the category CHECK constraint with the new 3-value set.
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products
  ADD CONSTRAINT products_category_check
  CHECK (category IN ('artificial-grass', 'natural-grass', 'futsal'));

COMMIT;
