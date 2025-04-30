import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init(
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
  },
  {
    sequelize,
    modelName: "Category",
    indexes: [
      {
        fields: ["name"],
      },
    ],
  }
);

export default Category;
