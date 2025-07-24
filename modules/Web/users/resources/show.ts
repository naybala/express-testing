import { User } from "@prisma/client";

export interface ShowUserInterface {
  id: number;
  name: string;
  email?: string;
  role?: string;
}

export function showUserResource(user: User): ShowUserInterface {
  return {
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',
  };
}
