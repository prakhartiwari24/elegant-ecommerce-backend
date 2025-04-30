"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await queryInterface.bulkInsert("categories", [
      { name: "Electronics", createdAt: new Date(), updatedAt: new Date() },
      { name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
      { name: "Books", createdAt: new Date(), updatedAt: new Date() },
    ]);

    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM categories;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const electronicsId = categories.find((c) => c.name === "Electronics")?.id;
    const clothingId = categories.find((c) => c.name === "Clothing")?.id;
    const booksId = categories.find((c) => c.name === "Books")?.id;

    await queryInterface.bulkInsert("products", [
      {
        name: "Laptop",
        price: 1200.0,
        categoryId: electronicsId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shirt",
        price: 20.0,
        categoryId: clothingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Novel",
        price: 10.0,
        categoryId: booksId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("users", [
      {
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'admin@example.com';`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const adminUserId = users[0]?.id;

    await queryInterface.bulkInsert("orders", [
      {
        totalPrice: 1230.0,
        userId: adminUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const orders = await queryInterface.sequelize.query(
      `SELECT id FROM orders LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const orderId = orders[0]?.id;

    const products = await queryInterface.sequelize.query(
      `SELECT id FROM products ORDER BY id ASC LIMIT 2;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("order_products", [
      {
        orderId,
        productId: products[0]?.id,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId,
        productId: products[1]?.id,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("order_products", null, {});
    await queryInterface.bulkDelete("orders", null, {});
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
