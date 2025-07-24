import { BaseRepositoryInterface } from "./baseRepository.interface";

export const baseRepository = <TModel>(
  model: any
): BaseRepositoryInterface<TModel> => {
  let query: {
    where: Record<string, any>;
    include: Record<string, boolean>;
    select?: Record<string, boolean>; 
    orderBy?: Record<string, 'asc' | 'desc'>;// Add select property here
  } = {
    where: {},
    include: {},
  };

  const resetQuery = () => {
    query = { where: {}, include: {} };
  };

  const builder: BaseRepositoryInterface<TModel> = {
    //Where condition
    where(field: string, value: any) {
      query.where[field] = value;
      return builder;
    },
    //Get not deleted data
    notDeleted() {
      query.where["deletedAt"] = null;
      return builder;
    },
    //Select fields
    select(fields: string | string[]) {
      if (!query.select) {
        query.select = {};
      }

      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          query.select![field.trim()] = true;
        });
      } else {
        // Split comma-separated string
        fields.split(",").forEach((field) => {
          const trimmed = field.trim();
          if (trimmed) {
            query.select![trimmed] = true;
          }
        });
      }

    return builder; // assuming builder is your chainable context
    },
    //Include relations
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
    //Order by
    order(field: string, direction: 'asc' | 'desc' = 'asc') {
      query.orderBy = { [field]: direction };
      return builder;
    },
    //Raw query
    rawQuery(queryBuilder) {
      return queryBuilder(model);
    },
    //Get all data
    async get() {
  const queryOptions: any = {
    where: query.where || {},
  };

  // Use only one: select or include (never both)
  if (query.select && Object.keys(query.select).length > 0) {
    queryOptions.select = query.select;
  } else if (query.include && Object.keys(query.include).length > 0) {
    queryOptions.include = query.include;
  }

  if (query.orderBy) {
    queryOptions.orderBy = query.orderBy;
  }

  const result = await model.findMany(queryOptions);
  resetQuery();
  return result;
    },
    //Get data with pagination
    async getWithPaginate(
      page: number = 1,
      limit: number = 10,
      search: string | null = "",
      searchableFields: string[] = ["name", "description"]  
    ) {
    const skip = (page - 1) * limit;

      const searchCondition =
        search && searchableFields.length > 0
          ? {
              OR: searchableFields.map((field) => ({
                [field]: { contains: search},
              })),
            }
          : {};

      const baseWhere = {
        deletedAt: null,
        ...searchCondition,
      };

      const queryOptions: any = {
        where: baseWhere,
        skip,
        take: limit,
      };

      if (query.orderBy && Object.keys(query.orderBy).length > 0) {
        queryOptions.orderBy = query.orderBy;
      }

      if (query.include && Object.keys(query.include).length > 0) {
        queryOptions.include = query.include;
      }

      const [data, total] = await Promise.all([
        model.findMany(queryOptions),
        model.count({ where: baseWhere }),
      ]);

      resetQuery();

      return {
        data,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      };
    },
    //Get first data
    async first() {
      const result = await model.findFirst({
        where: query.where,
        include: query.include,
      });
      resetQuery();
      return result;
    },
    //Get data by id
    async find(id: number) {
      const result = await model.findUnique({
        where: { id },
        include: query.include,
      });
      resetQuery();
      return result;
    },
    //Create data
    async create(data: Partial<TModel>) {      
      return model.create({ data });
    },
    //Update data by id
    async update(id: number, data: Partial<TModel>) {
      return model.update({ where: { id }, data });
    },
    //Permanent delete data by id
    async delete(id: number) {
      return model.delete({ where: { id } });
    },
    //Soft delete data by id
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
