const { validationResult } = require("express-validator");

const handleNoUserData = (res, userData) => {
  if (!userData) {
    res.statusCode = 404;
    return res.json("can not get user");
  }

  return res.json({ data: userData });
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

module.exports = { handleNoUserData, validateRequest };
