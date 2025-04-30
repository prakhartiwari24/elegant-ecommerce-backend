"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("Products", ["categoryId"], {
      name: "category_id_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Products", "category_id_index");
  },
};
