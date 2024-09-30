const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Create an instance of Express
const app = express();
app.use(cookieParser());

// Middleware for parsing JSON request bodies
app.use(express.json({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:3001', //included origin as true
  credentials: true, //included credentials as true
};

// Enable CORS for cross-origin requests
app.use(cors(corsOptions));

// Connect to the MongoDB database
require('./config/db')
require('./services/scrapingService')

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
