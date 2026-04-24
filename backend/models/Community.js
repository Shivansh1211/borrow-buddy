import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  inviteCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  rules: {
    lateFeePerDay: {
      type: Number,
      default: 50 // default 50 rupees/currency unit
    },
    maxStrikeCount: {
      type: Number,
      default: 3
    }
  },
  razorpayAccountId: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Community', communitySchema);
