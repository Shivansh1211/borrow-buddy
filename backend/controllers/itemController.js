import Item from '../models/Item.js';
import Transaction from '../models/Transaction.js';

// Get all available items (not my own)
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ available: true, ownerId: { $ne: req.user._id } }).populate('ownerId', 'name');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new item
export const createItem = async (req, res) => {
  try {
    const { name, description, whatsapp, instagram } = req.body;
    const item = await Item.create({
      name,
      description,
      whatsapp,
      instagram,
      ownerId: req.user._id
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Borrow an item
export const borrowItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (!item.available) {
      return res.status(400).json({ message: 'Item is already borrowed' });
    }

    if (item.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot borrow your own item' });
    }

    item.available = false;
    await item.save();

    const transaction = await Transaction.create({
      item: item._id,
      borrower: req.user._id,
      lender: item.ownerId,
      status: 'active'
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Return an item
export const returnItem = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ item: req.params.id, status: 'active', borrower: req.user._id });

    if (!transaction) {
      return res.status(404).json({ message: 'Active transaction not found' });
    }

    transaction.status = 'returned';
    await transaction.save();

    const item = await Item.findById(req.params.id);
    item.available = true;
    await item.save();

    res.status(200).json({ message: 'Item returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
