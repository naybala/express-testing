import { PrismaClient } from "@prisma/client";
import { BaseRepositoryInterface } from "./baseRepository.interface";
const prisma = new PrismaClient();

export const baseRepository = <TModel>(model: any) : BaseRepositoryInterface<TModel> => ({
  get: () => model.findMany(),
  find: (id: number) => model.findUnique({ where: { id } }),
  findByOtherField : (otherField: string, value: any) => 
    model.findUnique({
      where: {
        [otherField]: value,
      },
    }),
  create: (data: any) => model.create({ data }),
  update: (id: number, data: any) => model.update({ where: { id }, data }),
  softDelete: (id: number, deletedBy?: number) =>
    model.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        ...(deletedBy !== undefined ? { deletedBy } : {}),
      },
    }),
});
