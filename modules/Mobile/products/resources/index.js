export default function productResource(product) {
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