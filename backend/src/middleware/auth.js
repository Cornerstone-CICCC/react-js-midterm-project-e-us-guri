import * as jose from 'jose';

let JWKS;

function getJWKS() {
  if (!JWKS) {
    JWKS = jose.createRemoteJWKSet(
      new URL(`${process.env.NEON_AUTH_URL}/.well-known/jwks.json`)
    );
  }
  return JWKS;
}

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { payload } = await jose.jwtVerify(token, getJWKS());
    req.userId = payload.sub;
    req.userEmail = payload.email;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
