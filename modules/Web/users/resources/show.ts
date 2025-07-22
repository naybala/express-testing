import { User } from "@prisma/client";

export interface ShowUserInterface {
  id: number;
  name: string;
}

export function showUserResource(user: User): ShowUserInterface {
  return {
    id: user.id,
    name: user.name ?? ''
  };
}
