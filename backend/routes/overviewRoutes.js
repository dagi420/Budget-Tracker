// backend/routes/overviewRoutes.js
const express = require('express');
const { getOverview } = require('../controllers/overviewController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getOverview);

module.exports = router;