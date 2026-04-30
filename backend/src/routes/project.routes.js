const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/role.middleware');
const c = require('../controllers/project.controller');

router.use(protect);

router.get('/', c.getProjects);
router.get('/:id', c.getProject);
router.post('/', requireAdmin,
  [body('name').trim().notEmpty()], validate, c.createProject);
router.put('/:id', requireAdmin, c.updateProject);
router.delete('/:id', requireAdmin, c.deleteProject);
router.post('/:id/members', requireAdmin, c.addMember);
router.delete('/:id/members/:userId', requireAdmin, c.removeMember);

module.exports = router;