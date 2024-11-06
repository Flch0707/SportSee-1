const prisma = require("./db");
const bcrypt = require("bcryptjs");

/**
 *
 * @param {string} username
 * @param {*string} password
 * @returns
 */
const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      userInfos: true,
    },
  });

  return users;
};

/**
 *
 * @param {string} username
 * @param {*string} password
 * @returns
 */
const getUserByCredential = async (username, password) => {
  const user = await prisma.user.findFirst({
    where: {
      userInfos: {
        username: username.toString().toLowerCase(),
      },
    },
    include: {
      userInfos: true,
      keyData: true,
    },
  });
  if (!user) return;
  if (!bcrypt.compareSync(password, user.userInfos.password)) {
    console.log("password incorrect");
    throw new Error("password incorrect");
  }
  return user;
};

/**
 * @param {number} id
 */
const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      userInfos: true,
      keyData: true,
    },
  });
  return user;
};

/**
 * @param {number} id
 */
const getUserActivityById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      activities: true,
    },
  });
  return user;
};

/**
 * @param {number} id
 */
const getUserAverageSession = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      sessions: true,
    },
  });
  return user;
};

/**
 * @param {number} id
 */
const getUserPerformance = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      performances: true,
    },
  });
  return user;
};

const createUser = async (username, password) => {
  const hash = bcrypt.hashSync(password, 8);
  const user = await prisma.user.create({
    data: {
      userInfos: {
        create: { username: username, password: hash },
      },
      keyData: {
        create: {
          calorieCount: 0,
          proteinCount: 0,
          carbohydrateCount: 0,
          lipidCount: 0,
        },
      },
    },
    include: {
      activities: true,
      performances: true,
      sessions: true,
    },
  });

  return user;
};

// const updateUser = async () => {
//   const hash = bcrypt.hashSync("password", 8);

//   await prisma.userInfos.update({
//     where: { id: 2 },
//     data: { password: hash },
//   });
// };

// updateUser();

module.exports = {
  getUsers,
  getUserByCredential,
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
  createUser,
};
