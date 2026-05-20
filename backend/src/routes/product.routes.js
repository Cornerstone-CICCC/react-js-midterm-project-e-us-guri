import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = Router();

// Public routes
router.get('/', listProducts);
router.get('/:id', getProduct);

// Admin-only routes
router.post('/', authMiddleware, requireRole('admin'), createProduct);
router.put('/:id', authMiddleware, requireRole('admin'), updateProduct);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteProduct);

export default router;
