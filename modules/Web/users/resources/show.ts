import { User } from "@prisma/client";

export interface ShowUserInterface {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

export function showUserResource(user: User): ShowUserInterface {
  return {
    id: user.id,
    name: user.name ?? '',
    email: user.email,
    roleId: user.roleId!,
  };
}
