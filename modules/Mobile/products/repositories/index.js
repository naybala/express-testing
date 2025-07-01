const prisma = require("../../../../config/db");

async function getAllProducts() {
  return await prisma.product.findMany({
    where: { deletedAt: null },
    include: {
      category: true,
    },
  });
}

async function getProductById(id) {
  return await prisma.product.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
}

async function getOtherProducts(excludeId) {
  return await prisma.product.findMany({
    where: {
      id: { not: excludeId },
      deletedAt: null,
    },
    take: 5,
  });
}

async function createProduct(data) {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({ data });

    // Example side effect: create log entry (optional)
    // await tx.productLog.create({
    //   data: {
    //     productId: product.id,
    //     action: 'created',
    //     createdAt: new Date(),
    //   },
    // });

    return product;
  });
}

async function deleteProduct(id) {
  return await prisma.product.delete({
    where: { id },
  });
}

async function softDeleteProduct(id) {
  return await prisma.$transaction(async (tx) => {
    const updated = await tx.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    // Example: maybe log the deletion here
    // await tx.productLog.create({
    //   data: {
    //     productId: id,
    //     action: 'soft-deleted',
    //     createdAt: new Date(),
    //   },
    // });

    return updated;
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  getOtherProducts,
  createProduct,
  deleteProduct,
  softDeleteProduct,
};
