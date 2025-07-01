const express = require("express");
const router = express.Router();
const productController = require("../controllers");
const {
  createProductValidator,
  updateProductValidator,
} = require("../validations");
const validateRequest = require("../../base/validateRequest");
const auth = require("../../base/auth");

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
