import Transaction from '../models/Transaction.js';
import Item from '../models/Item.js';

// Request to borrow an item
export const requestBorrow = async (req, res) => {
  try {
    const { itemId, expectedReturnDate } = req.body;
    const item = await Item.findById(itemId);

    if (!item || item.status !== 'AVAILABLE') {
      return res.status(400).json({ message: 'Item is not available' });
    }

    if (item.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot borrow your own item' });
    }

    const startDate = new Date();
    const endDate = new Date(expectedReturnDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    if (days <= 0) return res.status(400).json({ message: 'Invalid return date' });

    const totalAmount = (item.rentalPricePerDay * days) + item.securityDeposit;

    const transaction = await Transaction.create({
      itemId: item._id,
      borrowerId: req.user._id,
      lenderId: item.ownerId,
      communityId: req.user.communityId,
      startDate,
      expectedReturnDate,
      totalAmount,
      status: 'PENDING'
    });

    item.status = 'REQUESTED';
    await item.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating request' });
  }
};

// Lender approves the request
export const approveRequest = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction || transaction.status !== 'PENDING') {
      return res.status(400).json({ message: 'Invalid transaction' });
    }

    if (transaction.lenderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    transaction.status = 'APPROVED';
    await transaction.save();

    res.status(200).json({ message: 'Request approved, waiting for payment', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Server error approving request' });
  }
};

// Mark item as returned (by borrower)
export const returnItem = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction || transaction.status !== 'ACTIVE') {
      return res.status(400).json({ message: 'Invalid transaction' });
    }

    if (transaction.borrowerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    transaction.actualReturnDate = new Date();
    // In a real app, this changes status to 'RETURNED_PENDING_CONFIRMATION' 
    // and the lender has to verify the condition. For now, mark completed.
    transaction.status = 'COMPLETED';
    await transaction.save();

    const item = await Item.findById(transaction.itemId);
    item.status = 'AVAILABLE';
    await item.save();

    res.status(200).json({ message: 'Item returned', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Server error returning item' });
  }
};
