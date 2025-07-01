import express from "express";
const router = express.Router();
import {index,show,store,update,destroy} from "../controllers/index.js";

import {
  createProductValidator,
  updateProductValidator,
} from "../validations/index.js";
import validateRequest from "../../base/validateRequest.js";
import auth from "../../base/auth.js";

router.get("/", auth, index);
router.get("/:id", auth, show);
router.post(
  "/",
  auth,
  createProductValidator,
  validateRequest,
  store
);
router.put(
  "/",
  auth,
  updateProductValidator,
  validateRequest,
  update
);
router.delete("/:id", auth, destroy);
export default router;
