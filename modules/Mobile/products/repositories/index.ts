import prisma from "../../../../config/db";
import { Prisma } from "@prisma/client";
import { Product } from "../../../domain/product/type";


// Get all non-deleted products, including category
export async function getAllProducts(): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { deletedAt: null },
    include: {
      category: true,
    },
  });
}

// Get single product by ID (non-deleted)
export async function getProductById(id: number): Promise<Product | null> {
  return await prisma.product.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
}

// Get other products excluding a specific ID
export async function getOtherProducts(excludeId: number): Promise<Product[]> {
  return await prisma.product.findMany({
    where: {
      id: { not: excludeId },
      deletedAt: null,
    },
    take: 5,
  });
}

// Create a new product with optional side effects (within a transaction)
export async function createProduct(
  data: Prisma.ProductCreateInput
): Promise<Product> {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({ data });

    // Optional log side-effect
    // await tx.productLog.create({
    //   data: {
    //     productId: product.id,
    //     action: "created",
    //     createdAt: new Date(),
    //   },
    // });

    return product;
  });
}

// Hard delete product by ID
export async function deleteProduct(id: number): Promise<Product> {
  return await prisma.product.delete({
    where: { id },
  });
}

// Soft delete product (update deletedAt timestamp)
export async function softDeleteProduct(id: number): Promise<Product> {
  return await prisma.$transaction(async (tx) => {
    const updated = await tx.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    // Optional logging
    // await tx.productLog.create({
    //   data: {
    //     productId: id,
    //     action: "soft-deleted",
    //     createdAt: new Date(),
    //   },
    // });

    return updated;
  });
}
// Update the product
export async function updateProduct(data: {
  id: number;
  name?: string;
  description?: string | null;
  categoryId?: number | null;
}): Promise<Product | null> {
  const { id, name, description, categoryId } = data;

  try {
    return await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
         category: categoryId !== undefined && categoryId !== null
          ? { connect: { id: categoryId } }
          : undefined,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return null;
    }
    throw error;
  }
}

// const productRepository = {
//   getAllProducts,
//   getProductById,
//   getOtherProducts,
//   createProduct,
//   deleteProduct,
//   softDeleteProduct,
//   updateProduct,
// };

// export default productRepository;
