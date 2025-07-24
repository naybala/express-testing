import { User,Role } from "@prisma/client";

export interface IndexUserInterface {
  id: number,
  name: string,
  email?: string,
  role?: Role,
}


export function indexUserResource(user: User): IndexUserInterface {
  return {
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',

  };
}


