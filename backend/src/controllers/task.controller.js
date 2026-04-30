const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getProjectTasks = asyncHandler(async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { projectId: req.params.projectId },
    include: {
      assignedTo: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(tasks);
});

exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate, assignedToId } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      assignedToId: assignedToId || null,
      projectId: req.params.projectId,
      createdById: req.user.id,
    },
    include: { assignedTo: { select: { id: true, name: true, email: true } } },
  });
  res.status(201).json(task);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  // Member can only update their own task status
  if (req.user.role !== 'ADMIN' && task.assignedToId !== req.user.id)
    return res.status(403).json({ message: 'Not allowed to edit this task' });

  const { title, description, status, priority, dueDate, assignedToId } = req.body;
  const data = req.user.role === 'ADMIN'
    ? { title, description, status, priority,
        dueDate: dueDate ? new Date(dueDate) : null, assignedToId }
    : { status };

  const updated = await prisma.task.update({
    where: { id: req.params.id },
    data,
    include: { assignedTo: { select: { id: true, name: true, email: true } } },
  });
  res.json(updated);
});

exports.updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'ADMIN' && task.assignedToId !== req.user.id)
    return res.status(403).json({ message: 'Not allowed' });

  const updated = await prisma.task.update({
    where: { id: req.params.id },
    data: { status: req.body.status },
  });
  res.json(updated);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  await prisma.task.delete({ where: { id: req.params.id } });
  res.json({ message: 'Task deleted' });
});

exports.myTasks = asyncHandler(async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { assignedToId: req.user.id },
    include: { project: { select: { id: true, name: true } } },
    orderBy: { dueDate: 'asc' },
  });
  res.json(tasks);
});