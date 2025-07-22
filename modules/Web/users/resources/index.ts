import { User,Role } from "@prisma/client";

export interface UserWithRole extends User {
  role?: Role | null;
}

export interface IndexUserInterface {
  id: number,
  name: string,
  email: string,
  role: string,
}


export function indexUserResource(user: UserWithRole): IndexUserInterface {
  return {
    id: user.id,
    email : user.email ?? '',
    name: user.name ?? '',
    role: user.role?.name ?? '',
  };
}


