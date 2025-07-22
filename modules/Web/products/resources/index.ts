import { Product, Category } from "@prisma/client";

export interface ProductWithCategory extends Product {
  category?: Category | null;
}

export interface IndexProductInterface {
  id: number,
  name: string,
  description: string | null,
  category: string | null,
}


export function indexProductResource(product: ProductWithCategory): IndexProductInterface {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category?.name ?? null,
  };
}


