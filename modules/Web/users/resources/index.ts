import { User,Role } from "@prisma/client";

export interface UserWithRole extends User {
  role?: Role | null;
}

export interface IndexUserInterface {
  id: number,
  name: string,
  email?: string,
  role?: string | null,
}


export function indexUserResource(user: UserWithRole): IndexUserInterface {
  return {
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',
    role: user.role?.name ?? null,
  };
}


