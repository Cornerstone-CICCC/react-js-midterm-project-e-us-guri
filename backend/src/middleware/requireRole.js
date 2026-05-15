export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // req.userRole is already set by authMiddleware
    const userRole = req.userRole || 'client';

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}
