const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');
const { signup, login, me } = require('../controllers/auth.controller');

router.post('/signup',
  [body('name').trim().notEmpty(),
   body('email').isEmail(),
   body('password').isLength({ min: 6 })],
  validate, signup);

router.post('/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validate, login);

router.get('/me', protect, me);

module.exports = router;