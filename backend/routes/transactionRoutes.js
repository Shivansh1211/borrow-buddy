import express from 'express';
import { 
  requestBorrow, 
  approveRequest, 
  returnItem 
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/request', protect, requestBorrow);
router.put('/:id/approve', protect, approveRequest);
router.put('/:id/return', protect, returnItem);

export default router;
