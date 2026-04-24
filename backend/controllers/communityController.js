import Community from '../models/Community.js';
import User from '../models/User.js';
import crypto from 'crypto';

// Generate a 6-character alphanumeric invite code
const generateInviteCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

export const createCommunity = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Community name is required' });

    let inviteCode;
    let isUnique = false;
    
    // Ensure invite code is unique
    while (!isUnique) {
      inviteCode = generateInviteCode();
      const existing = await Community.findOne({ inviteCode });
      if (!existing) isUnique = true;
    }

    const community = new Community({
      name,
      adminId: req.user._id,
      inviteCode
    });

    await community.save();

    // Assign admin role and communityId to the creator
    await User.findByIdAndUpdate(req.user._id, {
      communityId: community._id,
      role: 'ADMIN'
    });

    res.status(201).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating community' });
  }
};

export const getCommunityMembers = async (req, res) => {
  try {
    const { id } = req.params; // Community ID
    
    // Simple check: Only community admins should ideally see this, but for now any member can
    const members = await User.find({ communityId: id }).select('-password');
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching members' });
  }
};

export const updateCommunityRules = async (req, res) => {
  try {
    const { id } = req.params;
    const { rules, razorpayAccountId } = req.body;

    const community = await Community.findById(id);
    if (!community) return res.status(404).json({ message: 'Community not found' });

    // Ensure only the admin can update
    if (community.adminId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update rules' });
    }

    if (rules) community.rules = rules;
    if (razorpayAccountId) community.razorpayAccountId = razorpayAccountId;

    await community.save();

    res.status(200).json({ message: 'Community rules updated', community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating rules' });
  }
};
