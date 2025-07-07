import { BaseRepositoryInterface } from "./baseRepository.interface";

export const baseRepository = <TModel>(
  model: any
): BaseRepositoryInterface<TModel> => {
  let query: {
    where: Record<string, any>;
    include: Record<string, boolean>;
    select?: Record<string, boolean>; // Add select property here
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
    notDeleted() {
      query.where["deletedAt"] = null;
      return builder;
    },
    select(fields: string | string[]) {
      if (!query.select) {
        query.select = {};
      }

      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          query.select![field] = true;
        });
      } else {
        query.select[fields] = true;
      }
      return builder;
    },
    with(relations: string | string[]) {
      const handleRelation = (relationString: string) => {
        if (relationString.includes(":")) {
          const [relation, fieldsString] = relationString.split(":");
          const fields = fieldsString.split(",").reduce((acc, field) => {
            acc[field.trim()] = true;
            return acc;
          }, {} as Record<string, boolean>);

          query.include[relation.trim()] = { select: fields } as any;
        } else {
          query.include[relationString.trim()] = true;
        }
      };

      if (Array.isArray(relations)) {
        relations.forEach(handleRelation);
      } else {
        handleRelation(relations);
      }

      return builder;
    },

    async get() {
      const queryOptions: any = {
        where: query.where,
      };

      if (query.select && query.include) {
        queryOptions.select = {
          ...query.select,
          ...query.include,
        };
      } else if (query.select) {
        queryOptions.select = query.select;
      } else if (query.include) {
        queryOptions.include = query.include;
      }

      const result = await model.findMany(queryOptions);
      resetQuery();
      return result;
    },

    async first() {
      const result = await model.findFirst({
        where: query.where,
        include: query.include,
      });
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
