import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  lenderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  expectedReturnDate: {
    type: Date,
    required: true
  },
  actualReturnDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'COMPLETED', 'DISPUTED'],
    default: 'PENDING'
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  lateFee: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
