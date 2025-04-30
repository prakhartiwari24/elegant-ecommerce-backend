import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./utils/logger";
import sequelize from "./config/database";
import {
  authRoutes,
  categoryRoutes,
  orderRoutes,
  productRoutes,
} from "./routes";
import "./models/product.model";
import "./models/category.model";
import "./models/associations";
import "./models/order_product.model";

import rateLimit from "express-rate-limit";
import { errorHandler } from "./utils/errorHandler";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts from this IP, please try again later",
});

class App {
  private app: express.Application;
  private server: any;

  constructor() {
    this.app = express();
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use("/auth/login", loginLimiter);
    this.app.use("/auth", authRoutes);
    this.app.use("/categories", categoryRoutes);
    this.app.use("/orders", orderRoutes);
    this.app.use("/products", productRoutes);

    this.app.use(errorHandler);

    this.server = this.app.listen(5002, () => {
      logger.info(`Server running on port 5002 🚀`);
    });

    sequelize.sync({ logging: console.log }).then(() => {
      logger.info(`Database synchronized`);
    });
  }
  public start() {
    logger.info("App started");
  }
}

export let application = new App();

application.start();
