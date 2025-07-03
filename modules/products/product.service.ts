import { productRepository } from "../domain/product/product.repository";
import productResource from "./product.dto";

export const getProducts = async () => {
  const products = await productRepository.getWithCategory();
  return products.map(productResource);
};
