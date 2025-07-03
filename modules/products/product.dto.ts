import { Product, Category } from "@prisma/client";

export interface ProductWithCategory extends Product {
  category?: Category | null;
}

interface ProductResource {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
  deletedAt: Date | null;
  deletedBy: number | null;
}

function productResource(product: ProductWithCategory): ProductResource {
  return {
    id: product.id,
    name: product.name,
    category: product.category?.name ?? null,
    description: product.description,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    createdBy: product.createdBy,
    updatedBy: product.updatedBy,
    deletedAt: product.deletedAt,
    deletedBy: product.deletedBy,
  };
}

export default productResource;
