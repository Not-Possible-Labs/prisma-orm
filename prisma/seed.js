const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.user.deleteMany({});
  
  console.log('Start seeding...');
  
  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: 'Alice Johnson'
      }
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: 'Bob Smith'
      }
    }),
    prisma.user.create({
      data: {
        email: 'charlie@example.com',
        name: 'Charlie Garcia'
      }
    })
  ]);
  
  console.log(`Created ${users.length} users`);
  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma client
    await prisma.$disconnect();
  });
