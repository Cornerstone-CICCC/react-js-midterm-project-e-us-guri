import Stripe from 'stripe';
import { query } from '../config/db.js';
import { createError } from '../middleware/errorHandler.js';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not set — /api/payments/create-intent will 500.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

// POST /api/payments/create-intent
// Computes the cart total server-side (never trust the client) and creates
// a Stripe PaymentIntent. Returns the client_secret so the frontend's
// PaymentElement can confirm the payment in-place.
export async function createIntent(req, res, next) {
  try {
    const cartResult = await query(
      'SELECT id FROM carts WHERE user_id = $1',
      [req.userId]
    );

    if (cartResult.rows.length === 0) {
      throw createError('No cart found', 'validation', 400);
    }

    const cartId = cartResult.rows[0].id;

    const itemsResult = await query(
      `SELECT ci.quantity, p.price, p.stock, p.name
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    if (itemsResult.rows.length === 0) {
      throw createError('Cart is empty', 'validation', 400);
    }

    for (const item of itemsResult.rows) {
      if (item.stock < item.quantity) {
        throw createError(
          `Insufficient stock for "${item.name}". Available: ${item.stock}`,
          'validation',
          400
        );
      }
    }

    const subtotal = itemsResult.rows.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
    const tax = subtotal * 0.08;
    const totalCents = Math.round((subtotal + tax) * 100);

    const intent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        user_id: req.userId,
        cart_id: String(cartId),
      },
    });

    res.json({
      clientSecret: intent.client_secret,
      amount: totalCents,
    });
  } catch (err) {
    next(err);
  }
}
