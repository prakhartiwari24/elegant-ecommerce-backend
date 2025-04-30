"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("ecommerce_db", "ecommerce-prakhar", "5nVwCo6*3gaJVUkhwm#L", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map