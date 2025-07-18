export interface BaseRepositoryInterface<T> {
  where(field: string, value: any): BaseRepositoryInterface<T>;
  with(relations: string | string[]): BaseRepositoryInterface<T>;
  notDeleted(): BaseRepositoryInterface<T>;
  select(fields: string | string[]): BaseRepositoryInterface<T>; 
  get(): Promise<T[]>;
  first(): Promise<T | null>;
  find(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  softDelete(id: number, deletedBy?: number): Promise<T>;
}
