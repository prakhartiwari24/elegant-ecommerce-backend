import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Order extends Model {
  public id!: number;
  public totalPrice!: number;
  public userId!: number;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Order",
    indexes: [
      {
        fields: ["userId"],
      },
    ],
  }
);

export default Order;
