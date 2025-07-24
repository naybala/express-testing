import { body, ValidationChain } from "express-validator";

    export const storeRoleValidator: ValidationChain[] = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),
   body("description") 
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("permissions")
        .isArray({ min: 1 })
        .withMessage("Permissions must be an array"),
    ];

    export const updateRoleValidator: ValidationChain[] = [
    body("id")
        .isInt()
        .withMessage("Main id must be an integer"),
    body("name")
        .notEmpty()
        .withMessage("Name is required"),
    body("description") 
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("permissions")
        .isArray({ min: 1 })
        .withMessage("Permissions must be an array"),
    ];