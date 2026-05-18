import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { getStats } from '../controllers/admin.controller.js';

const router = Router();

router.use(authMiddleware, requireRole('admin'));

router.get('/stats', getStats);

export default router;
