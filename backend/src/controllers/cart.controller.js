import { query } from '../config/db.js';
import { createError } from '../middleware/errorHandler.js';

// Ensure the user has a cart, create one if not
async function getOrCreateCart(userId) {
  let result = await query('SELECT id FROM carts WHERE user_id = $1', [userId]);
  if (result.rows.length === 0) {
    result = await query(
      'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
      [userId]
    );
  }
  return result.rows[0].id;
}

// GET /api/cart
export async function getCart(req, res, next) {
  try {
    const cartId = await getOrCreateCart(req.userId);

    const result = await query(
      `SELECT ci.id, ci.product_id, ci.size, ci.quantity,
              p.name, p.brand, p.price, p.image_url, p.category, p.stock
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1
       ORDER BY ci.created_at`,
      [cartId]
    );

    const items = result.rows;
    const total = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    res.json({ items, total: Number(total.toFixed(2)) });
  } catch (err) {
    next(err);
  }
}

// POST /api/cart/items
export async function addItem(req, res, next) {
  try {
    const { productId, size, quantity = 1 } = req.body;

    if (!productId || !size) {
      throw createError('productId and size are required', 'validation', 400);
    }

    // Verify product exists and has stock
    const product = await query('SELECT id, stock FROM products WHERE id = $1', [productId]);
    if (product.rows.length === 0) {
      throw createError('Product not found', 'not_found', 404);
    }
    if (product.rows[0].stock < quantity) {
      throw createError('Insufficient stock', 'validation', 400);
    }

    const cartId = await getOrCreateCart(req.userId);

    // Upsert: if same product+size already in cart, increment quantity
    const result = await query(
      `INSERT INTO cart_items (cart_id, product_id, size, quantity)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (cart_id, product_id, size)
       DO UPDATE SET quantity = cart_items.quantity + $4
       RETURNING *`,
      [cartId, productId, size, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

// PUT /api/cart/items/:itemId
export async function updateItem(req, res, next) {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      throw createError('quantity must be at least 1', 'validation', 400);
    }

    const cartId = await getOrCreateCart(req.userId);

    const result = await query(
      `UPDATE cart_items SET quantity = $1
       WHERE id = $2 AND cart_id = $3
       RETURNING *`,
      [quantity, req.params.itemId, cartId]
    );

    if (result.rows.length === 0) {
      throw createError('Cart item not found', 'not_found', 404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/cart/items/:itemId
export async function removeItem(req, res, next) {
  try {
    const cartId = await getOrCreateCart(req.userId);

    const result = await query(
      'DELETE FROM cart_items WHERE id = $1 AND cart_id = $2 RETURNING id',
      [req.params.itemId, cartId]
    );

    if (result.rows.length === 0) {
      throw createError('Cart item not found', 'not_found', 404);
    }

    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/cart
export async function clearCart(req, res, next) {
  try {
    const cartId = await getOrCreateCart(req.userId);
    await query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    next(err);
  }
}
