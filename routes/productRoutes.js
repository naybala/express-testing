const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  createProductValidator,
  updateProductValidator,
} = require("../validators/productValidator");
const validateRequest = require("../middleware/validateRequest");

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post(
  "/",
  createProductValidator,
  validateRequest,
  productController.store
);
router.put(
  "/",
  updateProductValidator,
  validateRequest,
  productController.update
);
router.delete("/:id", productController.destroy);
module.exports = router;
