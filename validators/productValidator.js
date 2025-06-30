const { body } = require("express-validator");

const createProductValidator = [
  body("categoryId").isInt().withMessage("Category ID must be an integer"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

const updateProductValidator = [
  body("id").isInt().withMessage("Main id must be an integer"),
  body("categoryId").isInt().withMessage("Category ID must be an integer"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

module.exports = {
  createProductValidator,
  updateProductValidator,
};
