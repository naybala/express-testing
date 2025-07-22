import { body, ValidationChain } from "express-validator";

export const storeUserValidator: ValidationChain[] = [
  body("roleId")
    .isInt()
    .withMessage("Role ID must be an integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
  
];

export const updateUserValidator: ValidationChain[] = [
  body("id")
    .isInt()
    .withMessage("Main id must be an integer"),
  body("roleId")
    .isInt()
    .withMessage("Role ID must be an integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("description")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
