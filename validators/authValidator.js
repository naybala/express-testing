const { body } = require("express-validator");

const loginValidator = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const registerValidator = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  loginValidator,
  registerValidator,
};
