import { Product, Category } from "@prisma/client";

interface ProductWithCategory extends Product {
  category?: Category | null;
}

interface IndexProductInterface {
  id: number,
  name: string,
  category: string | null,
  categoryId: number | null,
  createdAt: Date,
}

interface ShowProductInterface {
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

export function indexProductResource(product: ProductWithCategory): IndexProductInterface {
  return {
    id: product.id,
    name: product.name,
    category: product.category?.name ?? null,
    categoryId: product.categoryId ?? null,
    createdAt: product.createdAt,
  };
}

export function showProductResource(product: ProductWithCategory): ShowProductInterface {
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

