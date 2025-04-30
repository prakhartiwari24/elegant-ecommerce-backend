import Product from "./product.model";
import Category from "./category.model";
import Order from "./order.model";
import OrderProduct from "./order_product.model";

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "orderId",
  otherKey: "productId",
  as: "orderProducts",
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
  otherKey: "orderId",
  as: "productOrders",
});
