const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getStats = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'ADMIN';
  const taskFilter = isAdmin ? {} : { assignedToId: req.user.id };

  const [total, todo, inProgress, done, overdue, projects] = await Promise.all([
    prisma.task.count({ where: taskFilter }),
    prisma.task.count({ where: { ...taskFilter, status: 'TODO' } }),
    prisma.task.count({ where: { ...taskFilter, status: 'IN_PROGRESS' } }),
    prisma.task.count({ where: { ...taskFilter, status: 'DONE' } }),
    prisma.task.count({
      where: { ...taskFilter, dueDate: { lt: new Date() }, status: { not: 'DONE' } },
    }),
    isAdmin
      ? prisma.project.count()
      : prisma.project.count({ where: { members: { some: { userId: req.user.id } } } }),
  ]);

  const overdueTasks = await prisma.task.findMany({
    where: { ...taskFilter, dueDate: { lt: new Date() }, status: { not: 'DONE' } },
    include: {
      project: { select: { id: true, name: true } },
      assignedTo: { select: { id: true, name: true } },
    },
    take: 5,
    orderBy: { dueDate: 'asc' },
  });

  res.json({
    stats: { total, todo, inProgress, done, overdue, projects },
    overdueTasks,
  });
});