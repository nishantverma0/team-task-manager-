const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany({
    where: req.user.role === 'ADMIN'
      ? {}
      : { members: { some: { userId: req.user.id } } },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      members: { include: { user: { select: { id: true, name: true, email: true } } } },
      _count: { select: { tasks: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(projects);
});

exports.getProject = asyncHandler(async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      members: { include: { user: { select: { id: true, name: true, email: true, role: true } } } },
      tasks: {
        include: {
          assignedTo: { select: { id: true, name: true, email: true } },
          createdBy: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
  if (!project) return res.status(404).json({ message: 'Project not found' });

  if (req.user.role !== 'ADMIN') {
    const isMember = project.members.some((m) => m.user.id === req.user.id);
    if (!isMember) return res.status(403).json({ message: 'Access denied' });
  }
  res.json(project);
});

exports.createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const project = await prisma.project.create({
    data: {
      name,
      description,
      ownerId: req.user.id,
      members: { create: { userId: req.user.id } },
    },
  });
  res.status(201).json(project);
});

exports.updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const project = await prisma.project.update({
    where: { id: req.params.id },
    data: { name, description },
  });
  res.json(project);
});

exports.deleteProject = asyncHandler(async (req, res) => {
  await prisma.project.delete({ where: { id: req.params.id } });
  res.json({ message: 'Project deleted' });
});

exports.addMember = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const member = await prisma.projectMember.create({
    data: { userId, projectId: req.params.id },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
  res.status(201).json(member);
});

exports.removeMember = asyncHandler(async (req, res) => {
  await prisma.projectMember.delete({
    where: { userId_projectId: { userId: req.params.userId, projectId: req.params.id } },
  });
  res.json({ message: 'Member removed' });
});