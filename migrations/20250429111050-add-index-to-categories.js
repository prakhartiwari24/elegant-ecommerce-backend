"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("Categories", ["name"], {
      name: "name_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Categories", "name_index");
  },
};
