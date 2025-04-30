import express from "express";
import ProductController from "../controllers/product.controller";
import { authenticateJWT } from "./middlewares/auth.middleware";
import { isAdmin } from "./middlewares/role.middleware";

const router = express.Router();

const productController = new ProductController();

router.get("/", productController.getAllProducts.bind(productController));
router.post(
  "/",
  authenticateJWT,
  isAdmin,
  productController.createProduct.bind(productController)
);
router.get("/:id", productController.getProductById.bind(productController));
router.put(
  "/:id",
  authenticateJWT,
  isAdmin,
  productController.updateProduct.bind(productController)
);
router.delete(
  "/:id",
  authenticateJWT,
  isAdmin,
  productController.deleteProduct.bind(productController)
);

export default router;
