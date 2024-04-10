// mongodbConnection.js

const mongoose = require('mongoose');

// Define the connectToMongoDB function
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/User_Mgt', {
      
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error to handle it in server.js
  }
}

// Export the connectToMongoDB function
module.exports = { connectToMongoDB };
