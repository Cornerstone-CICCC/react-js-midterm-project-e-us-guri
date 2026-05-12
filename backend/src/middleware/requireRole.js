import { query } from '../config/db.js';

export function requireRole(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const result = await query(
        'SELECT role FROM users WHERE id = $1',
        [req.userId]
      );

      if (result.rows.length === 0) {
        return res.status(403).json({
          error: 'User profile not found. Call /api/auth/sync-user first.',
        });
      }

      const userRole = result.rows[0].role;
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      req.userRole = userRole;
      next();
    } catch (err) {
      next(err);
    }
  };
}
