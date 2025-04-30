import OrderService from "../services/order.service";
import { Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import logger from "../utils/logger";

class OrderController {
  private readonly orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async getAllOrders(req: Request, res: Response) {
    logger.info("🚀 ~ OrderController ~ getAllOrders called");

    try {
      const orders = await this.orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }

  async getOrderById(req: Request, res: Response) {
    logger.info("🚀 ~ OrderController ~ getOrderById called");

    try {
      const order = await this.orderService.getOrderById(Number(req.params.id));
      res.status(200).json(order);
    } catch (err: any) {
      throw new ErrorHandler(err.message, 500);
    }
  }
}

export default OrderController;
