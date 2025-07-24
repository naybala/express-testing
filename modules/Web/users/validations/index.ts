import { body, ValidationChain } from "express-validator";

export const storeUserValidator: ValidationChain[] = [
    body("name")
    .notEmpty()
    .withMessage("Name is required"), 
    body("email")
    .notEmpty()
    .withMessage("Email is required"),
    body("password")
    .notEmpty()
    .withMessage("Password is required"),
    body("roleId")
    .notEmpty()
    .withMessage("RoleId is required"),
];

export const updateUserValidator: ValidationChain[] = [
    body("id")
    .isInt()
    .withMessage("Main id must be an integer"),
    body("name")
    .notEmpty()
    .withMessage("Name is required"),
     body("email")
    .notEmpty()
    .withMessage("Email is required"),
    body("password")
    .notEmpty()
    .withMessage("Password is required"),
    body("roleId")
    .notEmpty()
    .withMessage("RoleId is required"),
];
