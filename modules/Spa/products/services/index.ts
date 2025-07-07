import { productRepository } from "@domain/product/product.repository";
import { indexProductResource } from "../resources";

export const get = async () => {
    const products = await productRepository.with(['category:id,name']).select(['id', 'name','categoryId']).get();
    return products.map(indexProductResource);
}