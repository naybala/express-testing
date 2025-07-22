import { Router } from "express";
import * as userController from "../controllers";
import { authenticate } from "@web/base/auth";
import { storeUserValidator, updateUserValidator } from "../validations";
import { validateRequest } from "@web/base/validateRequest";


const router: Router = Router();

router.get("/", authenticate,userController.index);
router.get("/:id", authenticate, userController.show);
router.post(
  "/",
  authenticate,
  storeUserValidator,
  validateRequest,
  userController.store
);
router.put(
  "/",
  authenticate,
  updateUserValidator,
  validateRequest,
  userController.update
);
router.delete("/:id", authenticate, userController.destroy);


export default router;
