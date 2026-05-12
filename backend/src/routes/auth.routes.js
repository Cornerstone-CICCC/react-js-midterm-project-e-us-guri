import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { syncUser, getMe } from '../controllers/auth.controller.js';

const router = Router();

// Sync user after Neon Auth signup/login
router.post('/sync-user', authMiddleware, syncUser);

// Get current user profile
router.get('/me', authMiddleware, getMe);

export default router;
