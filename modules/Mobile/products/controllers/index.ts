import { Request, Response } from "express";
import { productRepository } from "../../../domain/product/product.repository";
import productResource from "../resources";
import { successResponse, errorResponse } from "../../base/response";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productRepository.get();
    const productResources = products.map(productResource);
    successResponse(res, productResources, 200, "Index Success");
  } catch (error) {
    errorResponse(res, 500, error, "Internal Server Error");
  }
};


