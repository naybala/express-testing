import { productRepository } from "@domain/product/product.repository";
import { indexProductResource } from "../resources";

export const get = async () => {
    const products = await productRepository.get({include:{category:true}});
    return products.map(indexProductResource);
}
