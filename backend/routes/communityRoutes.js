import express from 'express';
import { 
  createCommunity, 
  getCommunityMembers, 
  updateCommunityRules 
} from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCommunity);
router.get('/:id/members', protect, getCommunityMembers);
router.put('/:id/rules', protect, updateCommunityRules);

export default router;
