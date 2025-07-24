import { Router } from "express";
import * as roleController from "../controllers";
import { authenticate } from "@web/base/auth";
import { storeRoleValidator, updateRoleValidator } from "../validations";
import { validateRequest } from "@web/base/validateRequest";

const router: Router = Router();

router.get("/", authenticate, roleController.index);
router.post("/get-all-permission",authenticate, roleController.getAllPermission);
router.get("/get-all-roles",authenticate, roleController.getAllRole);
router.get("/:id", authenticate, roleController.show);
router.post(
  "/",
  authenticate,
  storeRoleValidator,
  validateRequest,
  roleController.store
);
router.put(
  "/",
  authenticate,
  updateRoleValidator,
  validateRequest,
  roleController.update
);
router.delete("/:id", authenticate, roleController.destroy);

export default router;