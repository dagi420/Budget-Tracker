// backend/routes/budgetRoutes.js
const express = require('express');
const { addBudget, getBudgets, getBudgetById, updateBudget, deleteBudget } = require('../controllers/budgetController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addBudget);
router.get('/', auth, getBudgets);
router.get('/:id', auth, getBudgetById);
router.put('/:id', auth, updateBudget);
router.delete('/:id', auth, deleteBudget);

module.exports = router;