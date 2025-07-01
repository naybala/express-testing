import { Router } from "express";
import * as productController from "../controllers";
import {
  createProductValidator,
  updateProductValidator,
} from "../validations";
import  {validateRequest} from "../../base/validateRequest";
import  { authenticate } from "../../base/auth";

const router: Router = Router();

router.get("/", authenticate, productController.index);
router.get("/:id", authenticate, productController.show);

router.post(
  "/",
  authenticate,
  createProductValidator,
  validateRequest,
  productController.store
);

router.put(
  "/",
  authenticate,
  updateProductValidator,
  validateRequest,
  productController.update
);

router.delete("/:id", authenticate, productController.destroy);

export default router;
