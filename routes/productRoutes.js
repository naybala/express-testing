const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  createProductValidator,
  updateProductValidator,
} = require("../validators/productValidator");
const validateRequest = require("../middleware/validateRequest");
const auth = require("../middleware/auth");

router.get("/", auth, productController.index);
router.get("/:id", auth, productController.show);
router.post(
  "/",
  auth,
  createProductValidator,
  validateRequest,
  productController.store
);
router.put(
  "/",
  auth,
  updateProductValidator,
  validateRequest,
  productController.update
);
router.delete("/:id", auth, productController.destroy);
module.exports = router;
