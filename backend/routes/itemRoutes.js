import express from 'express';
import { getItems, createItem, borrowItem, returnItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getItems);
router.post('/', protect, createItem);
router.post('/:id/borrow', protect, borrowItem);
router.post('/:id/return', protect, returnItem);

export default router;
