import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true
  },
  razorpayOrderId: {
    type: String,
    required: true
  },
  razorpayPaymentId: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: ['RENTAL', 'DEPOSIT', 'LATE_FEE'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  platformCommission: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
    default: 'PENDING'
  }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
