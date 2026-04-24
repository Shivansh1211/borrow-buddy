import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community' // Users belong to a primary community for now
  },
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    default: 'USER'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  trustScore: {
    type: Number,
    default: 5.0,
    min: 1.0,
    max: 5.0
  },
  strikes: {
    type: Number,
    default: 0
  },
  razorpayCustomerId: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
