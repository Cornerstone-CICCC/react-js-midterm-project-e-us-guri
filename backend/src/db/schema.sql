-- ============================================================
-- GD STORE - Database Schema
-- ============================================================

-- Users live in neon_auth.user (managed by Neon Auth / Better Auth).
-- Carts and orders FK directly to that table.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Products: cleats inventory
CREATE TABLE IF NOT EXISTS products (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    brand       VARCHAR(100) NOT NULL,
    price       NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    description TEXT,
    image_url   TEXT,
    category    VARCHAR(50) NOT NULL
                CHECK (category IN ('artificial-grass', 'natural-grass', 'futsal')),
    sizes       JSONB NOT NULL DEFAULT '[]',
    stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Carts: one active cart per user
CREATE TABLE IF NOT EXISTS carts (
    id          SERIAL PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES neon_auth.user(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT  unique_user_cart UNIQUE (user_id)
);

-- Cart items
CREATE TABLE IF NOT EXISTS cart_items (
    id          SERIAL PRIMARY KEY,
    cart_id     INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size        VARCHAR(10) NOT NULL,
    quantity    INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT  unique_cart_product_size UNIQUE (cart_id, product_id, size)
);

-- Orders: completed purchases
CREATE TABLE IF NOT EXISTS orders (
    id                          SERIAL PRIMARY KEY,
    user_id                     UUID NOT NULL REFERENCES neon_auth.user(id) ON DELETE CASCADE,
    status                      VARCHAR(20) NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
    total_amount                NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    stripe_payment_intent_id    VARCHAR(255) UNIQUE,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order items: snapshot of products at purchase time
CREATE TABLE IF NOT EXISTS order_items (
    id          SERIAL PRIMARY KEY,
    order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id  UUID REFERENCES products(id) ON DELETE SET NULL,
    name        VARCHAR(255) NOT NULL,
    brand       VARCHAR(100) NOT NULL,
    price       NUMERIC(10, 2) NOT NULL,
    size        VARCHAR(10) NOT NULL,
    quantity    INTEGER NOT NULL CHECK (quantity > 0),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
