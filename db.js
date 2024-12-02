import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  console.log('Attempting to connect with URI:', uri);
  
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Log the specific error code and message
    if (error.code) console.error('Error code:', error.code);
    if (error.codeName) console.error('Error codeName:', error.codeName);
    throw error;
  }
}

export default connectDB;