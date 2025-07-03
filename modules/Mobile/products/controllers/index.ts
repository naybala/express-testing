import { Request, Response } from "express";
import * as productRepository from "../repositories";
import productResource from "../resources";
import { successResponse, errorResponse } from "../../base/response";

// export async function index(req: Request, res: Response): Promise<void> {
//   try {
//     const products = await productRepository.getAllProducts();
//     const productResources = products.map(productResource);
//     successResponse(res, productResources, 200, "Index Success");
//   } catch (error) {
//     errorResponse(res, 500, error, "Internal Server Error");
//   }
// }

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productRepository.getAllProducts();
    const productResources = products.map(productResource);
    successResponse(res, productResources, 200, "Index Success");
  } catch (error) {
    errorResponse(res, 500, error, "Internal Server Error");
  }
};

export async function show(req: Request, res: Response): Promise<void> {
  try {
    const productId = parseInt(req.params.id);
    const product = await productRepository.getProductById(productId);
    if (!product) {
      errorResponse(res, 404, "Product not found");
      return;
    }
    successResponse(res, product);
  } catch (error) {
    errorResponse(res, 500, error, "Internal server error");
  }
}

export async function store(req: Request, res: Response): Promise<void> {
  try {
    const { categoryId, name, description } = req.body;

    const newProduct = await productRepository.createProduct({
      category: categoryId ? { connect: { id: categoryId } } : undefined,
      name,
      description,
    });

    successResponse(res, newProduct, 201, "Product created successfully");
  } catch (error) {
    errorResponse(res, 500, error, "Failed to create product");
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const { id, categoryId, name, description } = req.body;

    const updatedProduct = await productRepository.updateProduct({
      id,
      categoryId: categoryId,
      name,
      description,
    });

    if (!updatedProduct) {
      errorResponse(res, 404, "Product not found");
      return;
    }

    successResponse(res, updatedProduct, 200, "Product updated successfully");
  } catch (error) {
    errorResponse(res, 500, error, "Failed to update product");
  }
}

export async function destroy(req: Request, res: Response): Promise<void> {
  try {
    const productId = parseInt(req.params.id);
    const deletedProduct = await productRepository.softDeleteProduct(productId);

    if (!deletedProduct) {
      errorResponse(res, 404, "Product not found");
      return;
    }

    successResponse(res, null, 200, "Product deleted successfully");
  } catch (error) {
    errorResponse(res, 500, error, "Failed to delete product");
  }
}
