import Transaction from '../models/Transaction.js';
import Item from '../models/Item.js';

// Get items I have borrowed
export const getBorrowedItems = async (req, res) => {
  try {
    const transactions = await Transaction.find({ borrower: req.user._id })
      .populate('item')
      .populate('lender', 'name');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get items I have lent out
export const getLentItems = async (req, res) => {
  try {
    const myItems = await Item.find({ ownerId: req.user._id });
    
    const activeTransactions = await Transaction.find({ lender: req.user._id, status: 'active' })
      .populate('borrower', 'name');

    const result = myItems.map(item => {
      if (item.available) {
        return {
          _id: item._id,
          item: item,
          borrower: null,
          status: 'available'
        };
      } else {
        const tx = activeTransactions.find(t => t.item.toString() === item._id.toString());
        return {
          _id: tx ? tx._id : item._id,
          item: item,
          borrower: tx ? tx.borrower : null,
          status: 'lent out'
        };
      }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
