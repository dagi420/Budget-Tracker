const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 5000, // Default to 5000 if PORT is not set
  jwtSecret: process.env.JWT_SECRET,
};