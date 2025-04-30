import express from "express";
import OrderController from "../controllers/order.controller";
import { authenticateJWT } from "./middlewares/auth.middleware";
import { isAdmin } from "./middlewares/role.middleware";

const router = express.Router();

const orderController = new OrderController();

router.get(
  "/",
  authenticateJWT,
  isAdmin,
  orderController.getAllOrders.bind(orderController)
);
router.get(
  "/:id",
  authenticateJWT,
  isAdmin,
  orderController.getOrderById.bind(orderController)
);

export default router;
