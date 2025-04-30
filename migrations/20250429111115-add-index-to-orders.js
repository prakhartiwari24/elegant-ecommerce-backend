"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("Orders", ["userId"], {
      name: "user_id_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Orders", "user_id_index");
  },
};
