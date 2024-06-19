import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://dbuser:dbpass@cluster.6eqehlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

export default connectDB;