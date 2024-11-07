const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      // {
      //   id: 1,
      //   score: 0.9,
      //   username: "Flo06",
      //   firstName: "Florian",
      //   lastName: "Cheveau",
      //   password: "password",
      //   age: 31,
      // },
      // {
      //   id: 2,
      //   score: 0.12,
      //   firstName: "Karl",
      //   lastName: "Dovineau",
      //   age: 34,
      // },
      // {
      //   id: 3,
      //   score: 0.9,
      //   firstName: "Cecilia",
      //   lastName: "Ratorez",
      //   age: 31,
      // },
      {
        id: 4,
        score: 0.5,
        username: "alx",
        firstName: "Alex",
        lastName: "Doe",
        password: "newuserpassword",
        age: 28,
      },
    ],
  });

  await prisma.keyData.createMany({
    data: [
      {
        userId: 2,
        calorieCount: 1930,
        proteinCount: 155,
        carbohydrateCount: 290,
        lipidCount: 50,
      },
      {
        userId: 3,
        calorieCount: 2500,
        proteinCount: 90,
        carbohydrateCount: 150,
        lipidCount: 120,
      },
      {
        userId: 4,
        calorieCount: 2100,
        proteinCount: 120,
        carbohydrateCount: 250,
        lipidCount: 70,
      },
    ],
  });

  await prisma.userActivity.createMany({
    data: [
      {
        userId: 2,
        day: new Date("2020-07-01"),
        kilogram: 80,
        calories: 240,
      },
      {
        userId: 2,
        day: new Date("2020-07-02"),
        kilogram: 80,
        calories: 220,
      },
      {
        userId: 2,
        day: new Date("2020-07-03"),
        kilogram: 81,
        calories: 280,
      },
      {
        userId: 2,
        day: new Date("2020-07-04"),
        kilogram: 81,
        calories: 290,
      },
      {
        userId: 2,
        day: new Date("2020-07-05"),
        kilogram: 78,
        calories: 162,
      },
      {
        userId: 2,
        day: new Date("2020-07-06"),
        kilogram: 76,
        calories: 390,
      },
      {
        userId: 2,
        day: new Date("2020-07-07"),
        kilogram: 69,
        calories: 390,
      },
      {
        userId: 3,
        day: new Date("2020-07-01"),
        kilogram: 72,
        calories: 210,
      },
      {
        userId: 4,
        day: new Date("2020-07-01"),
        kilogram: 68,
        calories: 250,
      },
    ],
  });

  await prisma.userAverageSession.createMany({
    data: [
      {
        userId: 2,
        day: 1,
        sessionLength: 30,
      },
      {
        userId: 2,
        day: 2,
        sessionLength: 40,
      },
      {
        userId: 2,
        day: 3,
        sessionLength: 50,
      },
      {
        userId: 2,
        day: 4,
        sessionLength: 30,
      },
      {
        userId: 2,
        day: 5,
        sessionLength: 30,
      },
      {
        userId: 2,
        day: 6,
        sessionLength: 50,
      },
      {
        userId: 2,
        day: 7,
        sessionLength: 50,
      },
      {
        userId: 3,
        day: 1,
        sessionLength: 25,
      },
      {
        userId: 4,
        day: 1,
        sessionLength: 45,
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
      // User 2 performances
      { userId: 2, kindId: 1, value: 200 }, // Cardio
      { userId: 2, kindId: 2, value: 240 }, // Energy
      { userId: 2, kindId: 3, value: 80 }, // Endurance
      { userId: 2, kindId: 4, value: 120 }, // Strength
      { userId: 2, kindId: 5, value: 150 }, // Speed
      { userId: 2, kindId: 6, value: 90 }, // Intensity

      // User 3 performances
      { userId: 3, kindId: 1, value: 190 }, // Cardio
      { userId: 3, kindId: 2, value: 230 }, // Energy
      { userId: 3, kindId: 3, value: 85 }, // Endurance
      { userId: 3, kindId: 4, value: 110 }, // Strength
      { userId: 3, kindId: 5, value: 160 }, // Speed
      { userId: 3, kindId: 6, value: 100 }, // Intensity

      // User 4 performances
      { userId: 4, kindId: 1, value: 210 }, // Cardio
      { userId: 4, kindId: 2, value: 220 }, // Energy
      { userId: 4, kindId: 3, value: 95 }, // Endurance
      { userId: 4, kindId: 4, value: 100 }, // Strength
      { userId: 4, kindId: 5, value: 140 }, // Speed
      { userId: 4, kindId: 6, value: 85 }, // Intensity
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
