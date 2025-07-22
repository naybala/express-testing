import { Request, Response } from "express";
import * as baseResponse from "@web/base/response";
import * as userService from "../services";
import { dd } from '../../../../utils/dd';
import { matchedData } from "express-validator";


/**
 * @route GET /api/web/users
 * @description Get a paginated list of users
 * @access Authenticated
 */
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.get(req);    
    baseResponse.successResponse(res, users, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to fetch users");
  }
};


/**
 * @route POST /api/web/users
 * @description Create a new user
 * @access Authenticated 
 */
export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = matchedData(req, { locations: ["body"] });
    const newUser = await userService.store(validated);
    baseResponse.successResponse(res, newUser, 201, "User created");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to create user");
  }
};


/**
 * @route GET /api/web/users/:id
 * @description Get a specific user by ID
 * @access Authenticated
 */
export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.show(Number(req.params.id));
    if (!user) {
      baseResponse.errorResponse(res, 404, {}, "User not found");
      return;
    }
    baseResponse.successResponse(res, user, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to fetch user");
  }
};

/**
 * @route PUT /api/web/users
 * @description Update an existing user
 * @access Authenticated
 */
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = matchedData(req, { locations: ["body"] });
    const updatedUser = await userService.update(validated);
    if (!updatedUser) {
      baseResponse.errorResponse(res, 404, {}, "User not found");
      return;
    }
    baseResponse.successResponse(res, updatedUser, 200, "User updated");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to update user");   
  }
};


/**
 * @route DELETE /api/web/users/:id
 * @description Soft delete a user by ID
 * @access Authenticated
 */
export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await userService.softDelete(Number(req.params.id));
    if (!deleted) {
      baseResponse.errorResponse(res, 404, {}, "User not found");
      return;
    }
    baseResponse.successResponse(res, null, 204, "User deleted");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to delete user");
  }
};
