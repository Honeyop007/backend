import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI
        await mongoose.connect(`${uri}`);

        // Connection successful
        console.log('MongoDB Atlas connected successfully');

        // Optional: Listening for successful connection event
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

    } catch (error) {
        // Connection failed
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;
