import { Request, Response } from "express";
import * as baseResponse from "@web/base/response";
import * as roleService from "../services";
import { dd } from '../../../../utils/dd';
import { matchedData } from "express-validator";
import {Permissions} from "../../../../utils/permission"

/**
 * @route GET /api/Web/roles    
 * @description Get a paginated list of roles
 * @access Authenticated
 */
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await roleService.get(req);
    baseResponse.successResponse(res, roles, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to fetch roles");
  }
};

export const getAllRole = async (req: Request, res: Response): Promise<void> => {
  try{
    const roles = await roleService.getAllRole();
    baseResponse.successResponse(res, roles, 200);
  }catch(error){
    baseResponse.errorResponse(res, 500, error, "Failed to fetch roles");
  }
}

/**
 * @route POST /api/Web/roles/get-all-permission
 * @description Get all permission
 * @access Authenticated 
 */
export const getAllPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const permissions =  Permissions;    
    baseResponse.successResponse(res, permissions, 200, "Success");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to fetch permissions");
  }
};

/**
 * @route POST /api/Web/roles
 * @description Create a new role
 * @access Authenticated 
 */
export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = matchedData(req, { locations: ["body"] });  
    const newRole = await roleService.store(validated);
    baseResponse.successResponse(res, newRole, 201, "Role created");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to create role");
  }
};

/**
 * @route GET /api/Web/roles/:id
 * @description Get a specific role by ID
 * @access Authenticated
 */
export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const role = await roleService.show(Number(req.params.id));
    if (!role) {
      baseResponse.errorResponse(res, 404, {}, "Role not found");
      return;
    }
    baseResponse.successResponse(res, role, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to fetch role");
  }
};

/**
 * @route PUT /api/Web/roles
 * @description Update an existing role
 * @access Authenticated
 */
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = matchedData(req, { locations: ["body"] });
    const updatedRole = await roleService.update(validated);
    if (!updatedRole) {
      baseResponse.errorResponse(res, 404, {}, "Role not found");
      return;
    }
    baseResponse.successResponse(res, updatedRole, 200, "Role updated");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to update role");
  }
};

/**
 * @route DELETE /api/Web/roles/:id
 * @description Soft delete a role by ID
 * @access Authenticated
 */
export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await roleService.softDelete(Number(req.params.id));
    if (!deleted) {
      baseResponse.errorResponse(res, 404, {}, "Role not found");
      return;
    }
    baseResponse.successResponse(res, null, 204, "Role deleted");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to delete role");
  }
};