import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  images: [{
    type: String
  }],
  rentalPricePerDay: {
    type: Number,
    required: true,
    default: 0
  },
  securityDeposit: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'REQUESTED', 'BORROWED', 'UNAVAILABLE'],
    default: 'AVAILABLE'
  }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
