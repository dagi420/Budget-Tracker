// backend/routes/expenseRoutes.js
const express = require('express');
const { addExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } = require('../controllers/expenseController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addExpense);
router.get('/', auth, getExpenses);
router.get('/:id', auth, getExpenseById);
router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

module.exports = router;