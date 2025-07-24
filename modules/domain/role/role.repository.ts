import { RoleRepositoryInterface } from './roleRepository.interface';
    import { baseRepository } from '../base/base.repository';
    import prisma from '../../../config/db';
    import { Role } from '@prisma/client';

    const base = baseRepository<Role>(prisma.role);

    export const roleRepository: RoleRepositoryInterface = {
    ...base,
    };
