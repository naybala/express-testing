import {
  getAllProducts,
  getProductById,
  createProduct,
  getOtherProducts,
  softDeleteProduct,
  deleteProduct,
} from "../repositories/index.js";
import productResource from "../resources/index.js";
import { successResponse, errorResponse } from "../../base/response.js";

export async function index(req, res) {
  try {
    const products = await getAllProducts();
    const productResources = products.map(productResource);
    successResponse(res, productResources, 200, "Index Success");
  } catch (error) {
    errorResponse(res, 500, error, "Internal Server Error");
  }
}

export async function show(req, res) {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
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

export async function store(req, res) {
  const { categoryId, name, description } = req.body;

  const newProduct = await createProduct({
    categoryId,
    name,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct,
  });
}

export async function update(req, res) {
  const { id, categoryId, name, description } = req.body;

  const updatedProduct = await updateProduct({
    id,
    categoryId,
    name,
    description,
  });

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
}

export async function destroy(req, res) {
  const productId = parseInt(req.params.id);
  const deletedProduct = await softDeleteProduct(productId);

  if (!deletedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
}
