const express = require("express");
const idx = require("idx");
const { check } = require("express-validator");
const router = express.Router();
const { generateToken } = require("./utils/jwt");

const {
  getUsers,
  getUserByCredential,
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
  createUser,
} = require("./models");

const {
  authenticate,
  handleNoUserData,
  validateRequest,
  validatePassword,
} = require("./middleware");

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

router.get("/users", [authenticate], async (_, res) => {
  try {
    const userData = await getUsers();
    return handleNoUserData(res, userData);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get(
  "/user/:id",
  [
    authenticate,
    check("id").isInt().withMessage("User ID must be an integer"),
    validateRequest,
  ],
  async (req, res) => {
    const userId = idx(req, (_) => _.params.id);
    try {
      const userData = await getUserById(userId);
      return handleNoUserData(res, userData);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.get("/user/:id/activity", async (req, res) => {
  const userId = idx(req, (_) => _.params.id);
  try {
    const userData = await getUserActivityById(userId);
    await delay(3000);
    return handleNoUserData(res, userData);
  } catch (error) {
    console.error("Error fetching user activities:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/user/:id/average-sessions", async (req, res) => {
  const userId = idx(req, (_) => _.params.id);
  try {
    const userData = await getUserAverageSession(userId);
    await delay(3000);
    return handleNoUserData(res, userData);
  } catch (error) {
    console.error("Error fetching user session:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/user/:id/performance", async (req, res) => {
  const userId = idx(req, (_) => _.params.id);
  try {
    const userData = await getUserPerformance(userId);
    await delay(3000);
    return handleNoUserData(res, userData);
  } catch (error) {
    console.error("Error fetching user performance:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await getUserByCredential(
      req.body.username.toLowerCase().trim(),
      req.body.password
    );
    if (user) {
      const token = generateToken(user.id);
      return res.json({ token, userId: user.id });
    }
    res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    console.error("Error fetching", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/signup", [validatePassword], async (req, res) => {
  try {
    const user = await createUser(
      req.body.username.toLowerCase().trim(),
      req.body.password
    );
    if (user) {
      const token = generateToken(user.id);
      res.json({ token, userId: user.id });
    }
    res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    console.error("Error fetching", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
