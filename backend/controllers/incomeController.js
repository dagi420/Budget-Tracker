const Income = require('../models/Income');

// Add new income
exports.addIncome = async (req, res) => {
  const { source, amount, category } = req.body;

  try {
    const newIncome = new Income({
      user: req.user.id,
      source,
      amount,
      category,
    });

    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all incomes for the user
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.status(200).json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get income by ID
exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json(income);
  } catch (error) {
    console.error('Error fetching income:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update income
exports.updateIncome = async (req, res) => {
  try {
    const { source, amount, category } = req.body;
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      { source, amount, category },
      { new: true }
    );
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json(income);
  } catch (error) {
    console.error('Error updating income:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete income
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json({ message: 'Income deleted' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Server error' });
  }
};