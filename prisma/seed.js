const { PrismaClient, GameType, GameResult } = require("@prisma/client");
const prisma = new PrismaClient();
const falso = require("@ngneat/falso");
const cuid = require("../helpers/cuid2");

async function main() {
  // Clear existing data
  await prisma.gameHistory.deleteMany({});
  await prisma.userReport.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Start seeding...");

  // Create 5 users with different states
  const users = await Promise.all(
    Array.from({ length: 20 }, (_, index) => {
      const isSuspended = index === 1; // Second user is suspended
      const isBanned = index === 2; // Third user is banned

      return prisma.user.create({
        data: {
          id: cuid(),
          email: falso.randEmail(),
          username: falso.randUserName(),
          phone: falso.randPhoneNumber(),
          name: falso.randFullName({ withAccents: false }),
          emailVerified: falso.randBoolean(),
          isSuspended,
          suspendedAt: isSuspended ? new Date() : null,
          isBanned,
          bannedAt: isBanned ? new Date() : null,
          banReason: isBanned ? "Multiple violations of community guidelines" : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    })
  );

  // Create some game history
  const gameTypes = [GameType.STANDARD, GameType.CHESS960];
  const results = [GameResult.WIN, GameResult.LOSS, GameResult.DRAW];

  for (const user of users) {
    // Create 3 random game history entries for each user
    await Promise.all(
      Array.from({ length: 3 }, () =>
        prisma.gameHistory.create({
          data: {
            id: cuid(),
            userId: user.id,
            gameType: gameTypes[Math.floor(Math.random() * gameTypes.length)],
            wagerAmount: Math.floor(Math.random() * 1000),
            result: results[Math.floor(Math.random() * results.length)],
            startedAt: new Date(Date.now() - Math.floor(Math.random() * 7200000)), // Random start time within last 2 hours
            endedAt: new Date(), // Game has ended
            createdAt: new Date(),
          },
        })
      )
    );
  }

  // Create some user reports
  await prisma.userReport.create({
    data: {
      id: cuid(),
      reportedId: users[2].id, // Charlie (banned user) was reported
      reporterId: users[0].id, // Alice reported
      reason: "Inappropriate behavior",
      description: "User was being disruptive in chat",
      status: "RESOLVED",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.userReport.create({
    data: {
      id: cuid(),
      reportedId: users[1].id, // Bob (suspended user) was reported
      reporterId: users[0].id, // Alice reported
      reason: "Suspicious activity",
      description: "Possible cheating attempt",
      status: "PENDING",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`Created ${users.length} users`);
  console.log(`Added game history and reports`);
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
