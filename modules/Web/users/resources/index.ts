import { User,Role } from "@prisma/client";

export interface IndexUserInterface {
  id: number,
  name: string,
}


export function indexUserResource(user: User): IndexUserInterface {
  return {
    id: user.id,
    name: user.name ?? '',
  };
}


