import { Request, Response } from "express";
import * as productService from "./product.service";
import { successResponse, errorResponse } from "../Mobile/base/response";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const productResources = await productService.getProducts();
    successResponse(res, productResources, 200, "Index Success");
  } catch (error) {
    errorResponse(res, 500, error, "Internal Server Error");
  }
};


