export interface BaseRepositoryInterface<T> {
  get(): Promise<T[]>;
  find(id: number): Promise<T | null>;
  findByOtherField(otherField: string, value: any): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  softDelete(id: number, deletedBy?: number): Promise<T>;
}