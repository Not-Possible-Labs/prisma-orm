const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const falso = require("@ngneat/falso");
const cuid = require("../helpers/cuid2");

async function main() {
  // Clear existing data
  await prisma.user.deleteMany({});

  console.log("Start seeding...");

  // Create 5 sample users using a loop
  const users = await Promise.all(
    Array.from({ length: 5 }, () =>
      prisma.user.create({
        data: {
          id: cuid(),
          email: falso.randEmail(),
          name: falso.randFullName({ withAccents: false }),
          emailVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    )
  );

  console.log(`Created ${users.length} users`);
  console.log("Seeding finished");
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
