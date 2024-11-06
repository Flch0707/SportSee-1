const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const userInfos = await prisma.userInfos.create({
    data: {
      username: "Flo06",
      firstName: "Florian",
      lastName: "Cheveau",
      password: "password",
      age: 37,
    },
  });

  const keyData = await prisma.keyData.create({
    data: {
      calorieCount: 2500,
      proteinCount: 90,
      carbohydrateCount: 150,
      lipidCount: 120,
    },
  });
  await prisma.user.createMany({
    data: [
      {
        id: 19,
        userInfosId: userInfos.id,
        keyDataId: keyData.id,
        score: 0.9,
      },
      // Add more user records here
    ],
  });

  await prisma.userActivity.createMany({
    data: [
      {
        userId: 19,
        day: new Date("2020-07-01"),
        kilogram: 70,
        calories: 240,
      },
      {
        userId: 19,
        day: new Date("2020-07-02"),
        kilogram: 69,
        calories: 220,
      },
      {
        userId: 19,
        day: new Date("2020-07-03"),
        kilogram: 70,
        calories: 280,
      },
      {
        userId: 19,
        day: new Date("2020-07-04"),
        kilogram: 70,
        calories: 500,
      },
      {
        userId: 19,
        day: new Date("2020-07-05"),
        kilogram: 69,
        calories: 160,
      },
      {
        userId: 19,
        day: new Date("2020-07-06"),
        kilogram: 69,
        calories: 162,
      },
      {
        userId: 19,
        day: new Date("2020-07-07"),
        kilogram: 69,
        calories: 390,
      },
      // Add more activity records here
    ],
  });

  await prisma.userAverageSession.createMany({
    data: [
      {
        userId: 19,
        day: 1,
        sessionLength: 30,
      },
      {
        userId: 19,
        day: 2,
        sessionLength: 40,
      },
      {
        userId: 19,
        day: 3,
        sessionLength: 50,
      },
      {
        userId: 19,
        day: 4,
        sessionLength: 30,
      },
      {
        userId: 19,
        day: 5,
        sessionLength: 30,
      },
      {
        userId: 19,
        day: 6,
        sessionLength: 50,
      },
      {
        userId: 19,
        day: 7,
        sessionLength: 50,
      },

      // Add more session records here
    ],
  });

  await prisma.performanceKind.createMany({
    data: [
      { kind: "Cardio" },
      { kind: "energy" },
      { kind: "endurance" },
      { kind: "strength" },
      { kind: "speed" },
      { kind: "intensity" },
      // Add more kinds if needed
    ],
  });

  await prisma.userPerformance.createMany({
    data: [
      {
        userId: 19,
        kindId: 1,
        value: 200,
      },
      {
        userId: 19,
        value: 240,
        kindId: 2,
      },
      {
        userId: 19,
        value: 80,
        kindId: 3,
      },
      {
        userId: 19,
        value: 80,
        kindId: 4,
      },
      {
        userId: 19,
        value: 220,
        kindId: 5,
      },
      {
        userId: 19,
        value: 110,
        kindId: 6,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Database seeded successfully!");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Failed to seed database:", error);
    prisma.$disconnect();
    process.exit(1);
  });
