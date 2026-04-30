const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/role.middleware');
const c = require('../controllers/task.controller');

router.use(protect);

router.get('/my', c.myTasks);
router.get('/project/:projectId', c.getProjectTasks);
router.post('/project/:projectId', requireAdmin,
  [body('title').trim().notEmpty()], validate, c.createTask);
router.put('/:id', c.updateTask);
router.patch('/:id/status', c.updateTaskStatus);
router.delete('/:id', requireAdmin, c.deleteTask);

module.exports = router;