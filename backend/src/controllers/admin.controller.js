import { query } from '../config/db.js';

// GET /api/admin/stats  (admin only)
// Returns the numbers for the admin dashboard's top cards.
export async function getStats(req, res, next) {
  try {
    // Monthly sales: current 30-day window vs. the prior 30-day window.
    // We only count orders that actually completed (not cancelled).
    const salesResult = await query(
      `SELECT
         COALESCE(SUM(total_amount) FILTER (
           WHERE created_at >= NOW() - INTERVAL '30 days'
         ), 0)::numeric AS current_sales,
         COALESCE(SUM(total_amount) FILTER (
           WHERE created_at >= NOW() - INTERVAL '60 days'
             AND created_at <  NOW() - INTERVAL '30 days'
         ), 0)::numeric AS previous_sales
       FROM orders
       WHERE status <> 'cancelled'`
    );

    const current = Number(salesResult.rows[0].current_sales);
    const previous = Number(salesResult.rows[0].previous_sales);
    const deltaPct =
      previous > 0 ? ((current - previous) / previous) * 100 : null;

    const lowStockResult = await query(
      `SELECT COUNT(*)::int AS count FROM products WHERE stock < 5`
    );

    // Active = paid or shipped (still in the fulfillment pipeline).
    // Pending shipment = paid but not yet shipped.
    const ordersResult = await query(
      `SELECT
         COUNT(*) FILTER (WHERE status IN ('paid', 'shipped'))::int AS active,
         COUNT(*) FILTER (WHERE status = 'paid')::int AS pending_shipment
       FROM orders`
    );

    res.json({
      monthlySales: {
        current,
        previous,
        deltaPct,
      },
      lowStock: lowStockResult.rows[0].count,
      activeOrders: {
        total: ordersResult.rows[0].active,
        pendingShipment: ordersResult.rows[0].pending_shipment,
      },
    });
  } catch (err) {
    next(err);
  }
}
