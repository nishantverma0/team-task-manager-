const bcrypt = require('bcryptjs');
const prisma = require('../config/db');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: role === 'ADMIN' ? 'ADMIN' : 'MEMBER' },
    select: { id: true, name: true, email: true, role: true },
  });
  res.status(201).json({ user, token: generateToken(user) });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const safe = { id: user.id, name: user.name, email: user.email, role: user.role };
  res.json({ user: safe, token: generateToken(safe) });
});

exports.me = asyncHandler(async (req, res) => {
  res.json(req.user);
});