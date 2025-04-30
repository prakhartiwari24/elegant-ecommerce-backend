"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("Users", ["email"], {
      unique: true,
      name: "unique_email_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Users", "unique_email_index");
  },
};
