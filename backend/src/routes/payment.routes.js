import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { createIntent } from '../controllers/payment.controller.js';

const router = Router();

router.use(authMiddleware, requireRole('client', 'admin'));

router.post('/create-intent', createIntent);

export default router;
