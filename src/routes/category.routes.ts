import express from "express";
import CategoryController from "../controllers/category.controller";
import { authenticateJWT } from "./middlewares/auth.middleware";
import { isAdmin } from "./middlewares/role.middleware";

const router = express.Router();

const categoryController = new CategoryController();

router.get("/", categoryController.getAllCategories.bind(categoryController));
router.post(
  "/",
  authenticateJWT,
  isAdmin,
  categoryController.createCategory.bind(categoryController)
);
router.get("/:id", categoryController.getCategoryById.bind(categoryController));
router.put(
  "/:id",
  authenticateJWT,
  isAdmin,
  categoryController.updateCategory.bind(categoryController)
);
router.delete(
  "/:id",
  authenticateJWT,
  isAdmin,
  categoryController.deleteCategory.bind(categoryController)
);

export default router;
