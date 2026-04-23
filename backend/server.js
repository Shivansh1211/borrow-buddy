import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

import { MongoMemoryServer } from 'mongodb-memory-server';

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.log('No MONGO_URI found, spinning up local in-memory MongoDB...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error.message);
  }
};

connectDB();
