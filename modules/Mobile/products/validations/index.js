import { body } from "express-validator";

export const createProductValidator = [
  body("categoryId").isInt().withMessage("Category ID must be an integer"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

export const updateProductValidator = [
  body("id").isInt().withMessage("Main id must be an integer"),
  body("categoryId").isInt().withMessage("Category ID must be an integer"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
];
