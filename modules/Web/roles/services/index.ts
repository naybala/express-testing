import { Request } from "express";
    import { roleRepository } from "@domain/role/role.repository";
    import { indexRoleResource, IndexRoleInterface } from "../resources";
    import { showRoleResource, ShowRoleInterface } from "../resources/show";
    import { Role } from "@prisma/client";

type RoleQueryParams = {
  page?: string;
  limit?: string;
  search?: string;
};

// GET ALL with pagination
export const get = async (
  req: Request<any, any, any, RoleQueryParams>
): Promise<{
  data: IndexRoleInterface[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}> => {
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "10", 10);
  const search = req.query.search || "";

  const roles = await roleRepository
    .order("id", "asc")
    .getWithPaginate(page, limit, search);

  return {
    data: roles.data.map(indexRoleResource),
    page: roles.page,
    limit: roles.limit,
    total: roles.total,
    totalPages: roles.totalPages,
  };
};

//GET ALl Role 
export const getAllRole = async (): Promise<Role[]> => {
  const roles = await roleRepository.select("id,name").get();
  return roles;
};

// GET SINGLE
export const show = async (id: number): Promise<ShowRoleInterface | null> => {
  const role: Role | null = await roleRepository.find(id);
  return role ? showRoleResource(role) : null;
};

// CREATE
export const store = async (
  data: Partial<Role>
): Promise<Role> => {
  return roleRepository.create(data);
};

// UPDATE
export const update = async (
  data: Partial<Role>
): Promise<Role | null> => {
  const existing = await roleRepository.find(Number(data.id));
  if (!existing) return null;
  return roleRepository.update(Number(data.id), data);
};

// SOFT DELETE
export const softDelete = async (
  id: number,
  deletedBy?: number
): Promise<Role | null> => {
  const existing = await roleRepository.find(id);
  if (!existing) return null;
  return roleRepository.softDelete(id, deletedBy);
};

// HARD DELETE
export const hardDelete = async (
  id: number
): Promise<Role | null> => {
  const existing = await roleRepository.find(id);
  if (!existing) return null;
  return roleRepository.delete(id);
};