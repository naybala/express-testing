const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  loginValidator,
  registerValidator,
} = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");

router.post("/login", loginValidator, validateRequest, authController.login);
router.post(
  "/register",
  registerValidator,
  validateRequest,
  authController.register
);

module.exports = router;
