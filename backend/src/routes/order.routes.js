import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { checkout, listOrders, getOrder } from '../controllers/order.controller.js';

const router = Router();

// All order routes require authentication + client role
router.use(authMiddleware, requireRole('client'));

router.post('/checkout', checkout);
router.get('/', listOrders);
router.get('/:id', getOrder);

export default router;
