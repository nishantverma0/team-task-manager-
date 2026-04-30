const router = require('express').Router();
const { protect } = require('../middleware/auth.middleware');
const { getStats } = require('../controllers/dashboard.controller');

router.get('/stats', protect, getStats);
module.exports = router;