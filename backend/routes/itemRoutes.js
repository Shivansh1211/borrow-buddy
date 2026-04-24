import express from 'express';
import { getItems, createItem, updateItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getItems)
  .post(protect, createItem);

router.route('/:id')
  .put(protect, updateItem);

export default router;
