import express from 'express';
import { getBorrowedItems, getLentItems } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/borrowed', protect, getBorrowedItems);
router.get('/lent', protect, getLentItems);

export default router;
