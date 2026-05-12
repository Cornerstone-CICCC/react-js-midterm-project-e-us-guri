import pool, { query } from '../config/db.js';
import { createError } from '../middleware/errorHandler.js';

// POST /api/orders/checkout
export async function checkout(req, res, next) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Get user's cart
    const cartResult = await client.query(
      'SELECT id FROM carts WHERE user_id = $1',
      [req.userId]
    );

    if (cartResult.rows.length === 0) {
      throw createError('No cart found', 'validation', 400);
    }

    const cartId = cartResult.rows[0].id;

    // Get cart items with current product prices
    const itemsResult = await client.query(
      `SELECT ci.id, ci.product_id, ci.size, ci.quantity,
              p.name, p.brand, p.price, p.stock
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1
       FOR UPDATE OF p`,
      [cartId]
    );

    if (itemsResult.rows.length === 0) {
      throw createError('Cart is empty', 'validation', 400);
    }

    const items = itemsResult.rows;

    // Verify stock for all items
    for (const item of items) {
      if (item.stock < item.quantity) {
        throw createError(
          `Insufficient stock for "${item.name}" (size ${item.size}). Available: ${item.stock}`,
          'validation',
          400
        );
      }
    }

    // Calculate total
    const totalAmount = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, status, total_amount)
       VALUES ($1, 'pending', $2)
       RETURNING *`,
      [req.userId, totalAmount.toFixed(2)]
    );

    const order = orderResult.rows[0];

    // Create order items (snapshot)
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, brand, price, size, quantity)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [order.id, item.product_id, item.name, item.brand, item.price, item.size, item.quantity]
      );

      // Decrement stock
      await client.query(
        'UPDATE products SET stock = stock - $1, updated_at = NOW() WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    // Clear cart
    await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);

    await client.query('COMMIT');

    // Fetch the complete order with items
    const completeOrder = await query(
      `SELECT o.*,
              json_agg(json_build_object(
                'id', oi.id,
                'product_id', oi.product_id,
                'name', oi.name,
                'brand', oi.brand,
                'price', oi.price,
                'size', oi.size,
                'quantity', oi.quantity
              )) AS items
       FROM orders o
       JOIN order_items oi ON oi.order_id = o.id
       WHERE o.id = $1
       GROUP BY o.id`,
      [order.id]
    );

    res.status(201).json(completeOrder.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
}

// GET /api/orders
export async function listOrders(req, res, next) {
  try {
    const result = await query(
      `SELECT o.*,
              json_agg(json_build_object(
                'id', oi.id,
                'product_id', oi.product_id,
                'name', oi.name,
                'brand', oi.brand,
                'price', oi.price,
                'size', oi.size,
                'quantity', oi.quantity
              )) AS items
       FROM orders o
       JOIN order_items oi ON oi.order_id = o.id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/:id
export async function getOrder(req, res, next) {
  try {
    const result = await query(
      `SELECT o.*,
              json_agg(json_build_object(
                'id', oi.id,
                'product_id', oi.product_id,
                'name', oi.name,
                'brand', oi.brand,
                'price', oi.price,
                'size', oi.size,
                'quantity', oi.quantity
              )) AS items
       FROM orders o
       JOIN order_items oi ON oi.order_id = o.id
       WHERE o.id = $1 AND o.user_id = $2
       GROUP BY o.id`,
      [req.params.id, req.userId]
    );

    if (result.rows.length === 0) {
      throw createError('Order not found', 'not_found', 404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
