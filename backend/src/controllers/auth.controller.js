import { query } from '../config/db.js';

// POST /api/auth/sync-user
// Called after Neon Auth signup/login to ensure user exists in public.users
export async function syncUser(req, res, next) {
  try {
    const result = await query(
      `INSERT INTO users (id, role)
       VALUES ($1, 'client')
       ON CONFLICT (id) DO NOTHING
       RETURNING *`,
      [req.userId]
    );

    // If no row returned, user already existed — fetch it
    if (result.rows.length === 0) {
      const existing = await query(
        'SELECT id, role, created_at, updated_at FROM users WHERE id = $1',
        [req.userId]
      );
      return res.json(existing.rows[0]);
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me
// Returns the current user's profile
export async function getMe(req, res, next) {
  try {
    const result = await query(
      'SELECT id, role, created_at, updated_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
