-- ============================================================
-- Migration: drop local users table, point FKs at neon_auth.user
-- ============================================================
-- WARNING: this wipes existing carts and orders. Their user_id values
-- reference local users(id), which no longer exist after this migration.
-- For a midterm dev DB this is fine; for prod, write a backfill first.
-- ============================================================

BEGIN;

-- 1. Wipe rows whose user_id won't survive the FK swap.
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
DELETE FROM carts;

-- 2. Drop old FK constraints (named auto by Postgres — discover and drop).
ALTER TABLE carts  DROP CONSTRAINT IF EXISTS carts_user_id_fkey;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- 3. Add new FKs targeting Neon Auth's user table.
ALTER TABLE carts
  ADD CONSTRAINT carts_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES neon_auth.user(id) ON DELETE CASCADE;

ALTER TABLE orders
  ADD CONSTRAINT orders_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES neon_auth.user(id) ON DELETE CASCADE;

-- 4. Drop the local users table and its index.
DROP INDEX IF EXISTS idx_users_email;
DROP TABLE IF EXISTS users;

COMMIT;
