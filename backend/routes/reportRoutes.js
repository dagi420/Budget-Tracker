// backend/routes/reportRoutes.js
const express = require('express');
const { getExpenseReport } = require('../controllers/reportController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/expenses', auth, getExpenseReport);

module.exports = router;