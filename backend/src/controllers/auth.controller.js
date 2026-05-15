// GET /api/auth/me  — returns the authenticated user's id, email, role
export async function getMe(req, res) {
  res.json({
    id: req.userId,
    email: req.userEmail,
    role: req.userRole,
  });
}
