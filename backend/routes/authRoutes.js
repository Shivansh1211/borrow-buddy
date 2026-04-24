import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  inviteUser, 
  requestOtp 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/invite', protect, inviteUser); // Only admins should call this
router.post('/request-otp', requestOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile);

export default router;
