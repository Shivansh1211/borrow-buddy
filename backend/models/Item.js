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
  available: {
    type: Boolean,
    default: true
  },
  whatsapp: {
    type: String,
    default: ''
  },
  instagram: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
