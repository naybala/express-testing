import { productRepository } from "@domain/product/product.repository";
import { indexProductResource,IndexProductInterface } from "../resources";

export const get = async (): Promise<IndexProductInterface[]> => {
    const products = await productRepository.with("category:id,name").get();
    return products.map(indexProductResource);
}
