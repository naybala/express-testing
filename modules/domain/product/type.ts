export interface Product {
  id: number;
  name: string;
  categoryId: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
  deletedAt: Date | null;
  deletedBy: number | null;
}