import { Router } from "express";
import * as productController from "./product.controller";

const router: Router = Router();

router.get("/", productController.index);

export default router;
