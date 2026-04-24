import Payment from '../models/Payment.js';
import Transaction from '../models/Transaction.js';
import crypto from 'crypto';

// In a real app, import Razorpay SDK
// import Razorpay from 'razorpay';
// const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET });

export const createOrder = async (req, res) => {
  try {
    const { transactionId } = req.body;
    
    const transaction = await Transaction.findById(transactionId);
    if (!transaction || transaction.status !== 'APPROVED') {
      return res.status(400).json({ message: 'Invalid or unapproved transaction' });
    }

    if (transaction.borrowerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to pay for this transaction' });
    }

    // MOCK RAZORPAY ORDER CREATION
    const mockRazorpayOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;

    const payment = await Payment.create({
      transactionId: transaction._id,
      razorpayOrderId: mockRazorpayOrderId,
      type: 'RENTAL',
      amount: transaction.totalAmount,
      platformCommission: transaction.totalAmount * 0.05, // 5% fee
      status: 'PENDING'
    });

    res.status(200).json({
      message: 'Order created',
      orderId: mockRazorpayOrderId,
      amount: transaction.totalAmount,
      currency: 'INR',
      paymentId: payment._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating payment order' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, razorpayPaymentId, razorpaySignature } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    // MOCK VERIFICATION: In a real app, verify signature using crypto.createHmac
    
    payment.razorpayPaymentId = razorpayPaymentId || `pay_${crypto.randomBytes(8).toString('hex')}`;
    payment.status = 'SUCCESS';
    await payment.save();

    const transaction = await Transaction.findById(payment.transactionId);
    transaction.status = 'ACTIVE';
    await transaction.save();

    res.status(200).json({ message: 'Payment verified successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Server error verifying payment' });
  }
};
