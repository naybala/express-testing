import { Role } from "@prisma/client";

    export interface IndexRoleInterface {
    id: number,
    name: string,
    description: string,
    }

    export function indexRoleResource(role: Role): IndexRoleInterface {
    return {
        id: role.id,
        name: role.name ?? '',
        description: role.description ?? '',    
    };
    }