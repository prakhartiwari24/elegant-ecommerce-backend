import { Sequelize } from "sequelize";
import "dotenv/config";

const USERNAME = process.env.MYSQL_USERNAME as string;
const PASSWORD = process.env.MYSQL_PASSWORD as string;

const sequelize = new Sequelize("ecommerce_db", USERNAME, PASSWORD, {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
