import Order from "../models/order.model";
import Product from "../models/product.model";
import { ErrorHandler } from "../utils/errorHandler";

class OrderService {
  async getAllOrders() {
    try {
      const orders = await Order.findAll();
      return orders;
    } catch (err) {
      throw new ErrorHandler("Error fetching orders", 500);
    }
  }

  async getOrderById(id: number) {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          as: "orderProducts",
          through: { attributes: ["quantity"] },
        },
      ],
    });

    if (!order) {
      throw new ErrorHandler("Order not found", 404);
    }

    return order;
  }
}

export default OrderService;
