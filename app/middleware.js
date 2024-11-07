const { validationResult } = require("express-validator");
const { verifyToken } = require("./utils/jwt");
const { check } = require("express-validator");
const prisma = require("./db");

const handleNoUserData = (res, userData) => {
  if (!userData) {
    res.statusCode = 404;
    return res.json("can not get user");
  }

  return res.json(userData);
};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Invalid parameters",
      errors: errors.array(),
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  check(
    "password",
    "Password should be combination of one uppercase, one lower case, one special char, one digit and min 8 , max 20 char long"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Invalid password",
      errors: errors.array(),
    });
  }
  next();
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

const userExist = async (req, res, next) => {
  const username = req.body.username.toString().toLowerCase();
  try {
    const userNameExist = await prisma.user.findFirst({
      where: {
        username: username.toString().toLowerCase(),
      },
    });
    if (userNameExist) {
      return res.status(422).json({
        code: "001",
        status: "error",
        message: "username already exist",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "error while checking the user" });
  }
};

module.exports = {
  authenticate,
  handleNoUserData,
  validateRequest,
  validatePassword,
  userExist,
};
