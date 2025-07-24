import { Role } from "@prisma/client";

    export interface ShowRoleInterface {
    id: number,
    name: string,
    description: string,
    permissions: string[];
    }

    export function showRoleResource(role: Role): ShowRoleInterface {
        return {
            id: role.id,
            name: role.name ?? '',
            description: role.description ?? '',    
            permissions: Array.isArray(role.permissions)
            ? role.permissions.filter((p): p is string => typeof p === 'string')
            : [],
        };
    }