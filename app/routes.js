const express = require("express");
const idx = require("idx");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const {
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
} = require("./models");

const { handleNoUserData, validateRequest } = require("./middleware");

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

router.get(
  "/user/:id",
  [
    check("id").isInt().withMessage("User ID must be an integer"),
    validateRequest,
  ],
  (req, res) => {
    const userId = idx(req, (_) => _.params.id);
    const userData = getUserById(Number(userId));
    return handleNoUserData(res, userData);
  }
);

router.get("/user/:id/activity", (req, res) => {
  const userId = idx(req, (_) => _.params.id);
  const userData = getUserActivityById(Number(userId));
  return handleNoUserData(res, userData);
});

router.get("/user/:id/average-sessions", async (req, res) => {
  const userId = idx(req, (_) => _.params.id);
  const userData = getUserAverageSession(Number(userId));
  await delay(3000);
  return handleNoUserData(res, userData);
});

router.get("/user/:id/performance", (req, res) => {
  const userId = idx(req, (_) => _.params.id);
  const userData = getUserPerformance(Number(userId));

  return handleNoUserData(res, userData);
});

module.exports = router;
