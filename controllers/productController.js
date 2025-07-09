const productService = require("../services/productService");
const productResource = require("../resources/productResource");

async function index(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const products = await productService.getAllProducts(page, limit, search);
    // console.log(products);

    res.status(200).json({
      success: true,
      data: products.data.map(productResource),
      page: products.page,
      limit: products.limit,
      total: products.total,
      totalPages: products.totalPages,
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function show(req, res) {
  try {
    const productId = parseInt(req.params.id);
    const product = await productService.getProductById(productId);
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

async function store(req, res) {
  const { categoryId, name, description } = req.body;

  const newProduct = await productService.createProduct({
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

async function update(req, res) {
  const { id, categoryId, name, description } = req.body;

  const updatedProduct = await productService.updateProduct({
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

async function destroy(req, res) {
  const productId = parseInt(req.params.id);
  const deletedProduct = await productService.softDeleteProduct(productId);

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

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
