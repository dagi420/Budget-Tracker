// backend/routes/incomeRoutes.js
const express = require('express');
const { addIncome, getIncomes, getIncomeById, updateIncome, deleteIncome } = require('../controllers/incomeController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addIncome);
router.get('/', auth, getIncomes);
router.get('/:id', auth, getIncomeById);
router.put('/:id', auth, updateIncome);
router.delete('/:id', auth, deleteIncome);

module.exports = router;