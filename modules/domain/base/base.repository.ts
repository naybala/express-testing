import { BaseRepositoryInterface } from "./baseRepository.interface";

export const baseRepository = <TModel>(model: any): BaseRepositoryInterface<TModel> => {
  let query: {
    where: Record<string, any>;
    include: Record<string, boolean>;
  } = {
    where: {},
    include: {},
  };

  const resetQuery = () => {
    query = { where: {}, include: {} };
  };

  const builder: BaseRepositoryInterface<TModel> = {
    where(field: string, value: any) {
      query.where[field] = value;
      return builder;
    },

    with(relations: string | string[]) {
      if (Array.isArray(relations)) {
        relations.forEach(relation => {
          query.include[relation] = true;
        });
      } else {
        query.include[relations] = true;
      }
      return builder;
    },

    async get() {
      const result = await model.findMany({ where: query.where, include: query.include });
      resetQuery();
      return result;
    },

    async first() {
      const result = await model.findFirst({ where: query.where, include: query.include });
      resetQuery();
      return result;
    },

    async find(id: number) {
      const result = await model.findUnique({
        where: { id },
        include: query.include,
      });
      resetQuery();
      return result;
    },

    async create(data: Partial<TModel>) {
      return model.create({ data });
    },

    async update(id: number, data: Partial<TModel>) {
      return model.update({ where: { id }, data });
    },

    async softDelete(id: number, deletedBy?: number) {
      const data: any = { deletedAt: new Date() };
      if (deletedBy !== undefined) {
        data.deletedBy = deletedBy;
      }

      return model.update({ where: { id }, data });
    },
  };

  return builder;
};
