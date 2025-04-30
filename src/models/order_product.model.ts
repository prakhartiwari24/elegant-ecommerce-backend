import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Order from "./order.model";
import Product from "./product.model";

class OrderProduct extends Model {}

OrderProduct.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderProduct",
    tableName: "order_products",
    indexes: [
      {
        fields: ["orderId", "productId"],
      },
    ],
  }
);

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "orderId",
  otherKey: "productId",
  as: "products",
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
  otherKey: "orderId",
  as: "orders",
});

export default OrderProduct;
