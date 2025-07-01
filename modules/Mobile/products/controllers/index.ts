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
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    errorResponse(res, 500, error, "Failed to create product");
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const { id, categoryId, name, description } = req.body;

    const updatedProduct = await productRepository.updateProduct({
      id,
      categoryId: categoryId ,
      name,
      description,
    });

    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    errorResponse(res, 500, error, "Failed to update product");
  }
}

export async function destroy(req: Request, res: Response): Promise<void> {
  try {
    const productId = parseInt(req.params.id);
    const deletedProduct = await productRepository.softDeleteProduct(productId);

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    errorResponse(res, 500, error, "Failed to delete product");
  }
}
