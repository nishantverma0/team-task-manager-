const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const hashedAdmin = await bcrypt.hash('Admin@123', 10);
  const hashedMember = await bcrypt.hash('Member@123', 10);

  // Demo Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@demo.com',
      password: hashedAdmin,
      role: 'ADMIN',
    },
  });

  // Demo Member
  const member = await prisma.user.create({
    data: {
      name: 'Member User',
      email: 'member@demo.com',
      password: hashedMember,
      role: 'MEMBER',
    },
  });

  // Extra member
  const member2 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@demo.com',
      password: hashedMember,
      role: 'MEMBER',
    },
  });

  // Sample Project
  const project = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Revamp company website with new branding',
      ownerId: admin.id,
      members: {
        create: [
          { userId: admin.id },
          { userId: member.id },
          { userId: member2.id },
        ],
      },
    },
  });

  // Sample Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Design homepage mockup',
        description: 'Create Figma mockups for homepage',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        projectId: project.id,
        assignedToId: member.id,
        createdById: admin.id,
      },
      {
        title: 'Setup CI/CD pipeline',
        description: 'Configure GitHub Actions',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // overdue
        projectId: project.id,
        assignedToId: member2.id,
        createdById: admin.id,
      },
      {
        title: 'Write API documentation',
        status: 'DONE',
        priority: 'LOW',
        projectId: project.id,
        assignedToId: member.id,
        createdById: admin.id,
      },
    ],
  });

  console.log('✅ Seed complete!');
  console.log('👤 Admin  → admin@demo.com  / Admin@123');
  console.log('👤 Member → member@demo.com / Member@123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());