import User from '../models/User.js';
import Community from '../models/Community.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// In-memory store for OTPs and Invites (Replace with Redis in Production)
const otpStore = new Map(); // email -> { otp, expiresAt }
const inviteStore = new Map(); // token -> { email, communityId, role, expiresAt }

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// 1. Admin sends invite
export const inviteUser = async (req, res) => {
  try {
    // In real app, check if req.user is ADMIN of communityId
    const { email, communityId, role } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const inviteToken = crypto.randomBytes(20).toString('hex');
    
    inviteStore.set(inviteToken, {
      email,
      communityId,
      role: role || 'USER',
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    // MOCK EMAIL SENDING
    console.log(`[EMAIL SIMULATION] Sent invite to ${email}. Link: http://localhost:5173/auth?token=${inviteToken}`);

    res.status(200).json({ message: 'Invite sent successfully (check server console)', inviteToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 2. User requests OTP (after clicking invite link or during signup)
export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    // MOCK EMAIL SENDING
    console.log(`[EMAIL SIMULATION] Your OTP for Borrow Buddy is: ${otp}`);

    res.status(200).json({ message: 'OTP sent successfully to email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. User registers with invite token, OTP, and details
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, otp, inviteToken } = req.body;
    
    // Verify Invite
    const invite = inviteStore.get(inviteToken);
    if (!invite || invite.email !== email || invite.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired invite token' });
    }

    // Verify OTP
    const storedOtp = otpStore.get(email);
    if (!storedOtp || storedOtp.otp !== otp || storedOtp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      communityId: invite.communityId,
      role: invite.role,
      isVerified: true
    });

    // Cleanup memory
    inviteStore.delete(inviteToken);
    otpStore.delete(email);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        communityId: user.communityId,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').populate('communityId');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
