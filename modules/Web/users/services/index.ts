import { Request } from "express";
import { userRepository } from "@domain/user/user.repository";
import { indexUserResource, IndexUserInterface } from "../resources";
import { showUserResource, ShowUserInterface } from "../resources/show";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";


type UserQueryParams = {
  page?: string;
  limit?: string;
  search?: string;
  fields?: string[]; 
};

// GET ALL users with pagination
export const get = async (
  req: Request<any, any, any, UserQueryParams>
): Promise<{
  data: IndexUserInterface[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}> => {
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "10", 10);
  const search = req.query.search || "";

  const users = await userRepository
    .with("role:id,name") // join with role, selecting only id and name
    .order("id", "asc")
    .getWithPaginate(page, limit, search, ["name", "email"]); 

  return {
    data: users.data.map(indexUserResource),
    page: users.page,
    limit: users.limit,
    total: users.total,
    totalPages: users.totalPages,
  };
};
//  GET SINGLE User
export const show = async (id: number): Promise<ShowUserInterface | null> => {
  const user: User | null = await userRepository.find(id);
  return user ? showUserResource(user) : null;
};

//  CREATE User
export const store = async (
  data: Partial<User>
): Promise<User> => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return userRepository.create(data);
};

//  UPDATE User
export const update = async (
  data: Partial<User>
): Promise<User | null> => {  
  const existing = await userRepository.find(Number(data.id));
  if (!existing) return null;
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return userRepository.update(Number(data.id), data);
};

//  DELETE User (Soft Delete by default)
export const softDelete = async (
  id: number,
  deletedBy?: number
): Promise<User | null> => {
  const existing = await userRepository.find(id);
  if (!existing) return null;

  return userRepository.softDelete(id, deletedBy);
};

//  HARD DELETE (Permanent delete from the table no recover)
export const hardDelete = async (id: number): Promise<User | null> => {
  const existing = await userRepository.find(id);
  if (!existing) return null;

  return userRepository.delete(id);
};
