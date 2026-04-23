import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'returned'],
    default: 'active'
  },
  borrowDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
