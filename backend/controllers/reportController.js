// backend/controllers/reportController.js
const Expense = require('../models/Expense');

exports.getExpenseReport = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const amounts = categories.map(category => {
      return expenses
        .filter(expense => expense.category === category)
        .reduce((acc, expense) => acc + expense.amount, 0);
    });

    res.status(200).json({ categories, amounts });
  } catch (error) {
    console.error('Error fetching expense report:', error);
    res.status(500).json({ message: 'Server error' });
  }
};