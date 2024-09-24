// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const overviewRoutes = require('./routes/overviewRoutes');
const budgetRoutes = require('./routes/budgetRoutes'); // Add this line
const reportRoutes = require('./routes/reportRoutes'); // Add this line

// Initialize dotenv for environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes after app is initialized
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/budget', budgetRoutes); // Add this line
app.use('/api/report', reportRoutes); // Add this line

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));