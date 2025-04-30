import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public description?: string;
  public categoryId!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Product",
    indexes: [
      {
        fields: ["categoryId"],
      },
    ],
  }
);

export default Product;
