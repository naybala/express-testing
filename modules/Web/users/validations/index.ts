import { body, ValidationChain } from "express-validator";

export const storeUserValidator: ValidationChain[] = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"), 
];

export const updateUserValidator: ValidationChain[] = [
  body("id")
    .isInt()
    .withMessage("Main id must be an integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
];
