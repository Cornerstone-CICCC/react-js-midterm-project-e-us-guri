import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { checkout, listOrders, getOrder } from '../controllers/order.controller.js';

const router = Router();

// All order routes require authentication; both clients and admins can purchase
router.use(authMiddleware, requireRole('client', 'admin'));

router.post('/checkout', checkout);
router.get('/', listOrders);
router.get('/:id', getOrder);

export default router;
