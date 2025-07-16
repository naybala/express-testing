const { body } = require("express-validator");

const createProductValidator = [
  body("categoryId").isInt().withMessage("Category ID must be an integer"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),

  // Require images to be a non-empty array
  body("imageUrls")
    .isArray({ min: 1 })
    .withMessage("Images must be a non-empty array"),

  // body("imageUrls")
  //   .isArray({ max: 5 }) // max 5 images allowed, adjust as needed
  //   .withMessage("Images must be an array with max 5 items"),

  // body("imageUrls.*")
  //   .isString()
  //   .isURL()
  //   .withMessage("Each image must be a valid URL"),

  // body("imageUrls")
  //   .optional()
  //   .isArray({ max: 5 }) // max 5 images allowed, adjust as needed
  //   .withMessage("Images must be an array with max 5 items"),

  // body("imageUrls.*")
  //   .optional()
  //   .isString()
  //   .isURL()
  //   .withMessage("Each image must be a valid URL"),
];

const updateProductValidator = [
  body("id").isInt().withMessage("Main id must be an integer"),
  body("categoryId").isInt().withMessage("Category ID must be an integer"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),

  body("imageUrls")
    .isArray({ max: 5 })
    .withMessage("Images must be an array with max 5 items"),

  body("imageUrls.*")
    .isString()
    .isURL()
    .withMessage("Each image must be a valid URL"),
];

module.exports = {
  createProductValidator,
  updateProductValidator,
};
