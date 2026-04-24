import Item from '../models/Item.js';

// Get all available items in user's community (not my own)
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ 
      status: 'AVAILABLE', 
      communityId: req.user.communityId,
      ownerId: { $ne: req.user._id } 
    }).populate('ownerId', 'name trustScore');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new item
export const createItem = async (req, res) => {
  try {
    const { name, description, rentalPricePerDay, securityDeposit, images } = req.body;
    const item = await Item.create({
      name,
      description,
      rentalPricePerDay: rentalPricePerDay || 0,
      securityDeposit: securityDeposit || 0,
      images: images || [],
      ownerId: req.user._id,
      communityId: req.user.communityId
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating item' });
  }
};

// Update an item
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    if (item.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating item' });
  }
};
