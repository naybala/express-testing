import { Product, Category } from "@prisma/client";

export interface ProductWithCategory extends Product {
  category?: Category | null;
}

export interface IndexProductInterface {
  id: number,
  name: string,
  category: string | null,
}

interface ShowProductInterface {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
 
}

export function indexProductResource(product: ProductWithCategory): IndexProductInterface {
  return {
    id: product.id,
    name: product.name,
    category: product.category?.name ?? null,
  };
}

export function showProductResource(product: ProductWithCategory): ShowProductInterface {
  return {
    id: product.id,
    name: product.name,
    category: product.category?.name ?? null,
    description: product.description,
   
  };
}

