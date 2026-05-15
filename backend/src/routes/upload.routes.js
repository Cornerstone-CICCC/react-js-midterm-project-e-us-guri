import { Router } from 'express';
import { UTApi } from 'uploadthing/server';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = Router();

let utapi;
function getUtApi() {
  if (!utapi) utapi = new UTApi({ token: process.env.UPLOADTHING_TOKEN });
  return utapi;
}

// DELETE /api/uploads — body: { key?: string, url?: string }
router.delete('/', authMiddleware, requireRole('admin'), async (req, res, next) => {
  try {
    const { key, url } = req.body ?? {};
    let fileKey = key;
    if (!fileKey && typeof url === 'string') {
      const m = url.match(/\/f\/([^/?#]+)/);
      if (m) fileKey = decodeURIComponent(m[1]);
    }
    if (!fileKey) {
      return res.status(400).json({ error: 'key or url required' });
    }
    await getUtApi().deleteFiles(fileKey);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
