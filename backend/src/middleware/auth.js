import * as jose from 'jose';
import { query } from '../config/db.js';

// JWKS-based token verification using Neon Auth's public keys (EdDSA / Ed25519)
const NEON_AUTH_URL = process.env.NEON_AUTH_URL;

let jwks;
function getJWKS() {
  if (!jwks) {
    jwks = jose.createRemoteJWKSet(
      new URL(`${NEON_AUTH_URL}/.well-known/jwks.json`)
    );
  }
  return jwks;
}

/**
 * Verify a Neon Auth JWT and resolve the user's id/email/role.
 * Throws on invalid token. Pure function — usable outside Express middleware.
 */
export async function verifyToken(token) {
  const { payload } = await jose.jwtVerify(token, getJWKS());

  let userEmail = payload.email ?? null;
  let userRole = 'client';

  const r = await query(
    'SELECT email, role FROM neon_auth.user WHERE id = $1',
    [payload.sub]
  );
  if (r.rows.length > 0) {
    userEmail ||= r.rows[0].email;
    if (r.rows[0].role === 'admin') userRole = 'admin';
  }

  return { userId: payload.sub, userEmail, userRole };
}

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  try {
    const { userId, userEmail, userRole } = await verifyToken(authHeader.split(' ')[1]);
    req.userId = userId;
    req.userEmail = userEmail;
    req.userRole = userRole;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
