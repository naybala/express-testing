const prisma = require("../config/db");

async function getAllProducts() {
  return await prisma.product.findMany({
    where: { deletedAt: null },
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
  return await prisma.product.create({ data });
}

async function deleteProduct(id) {
  return await prisma.product.delete({
    where: { id },
  });
}

async function softDeleteProduct(id) {
  return await prisma.product.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
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
