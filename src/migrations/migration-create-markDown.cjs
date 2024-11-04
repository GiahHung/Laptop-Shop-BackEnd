"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MarkDowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT('long'),
      },
      contentHTML: {
        type: Sequelize.TEXT('long'),
      },
      contentMarkDown: {
        type: Sequelize.TEXT('long'),
      },
      productId: {
        type: Sequelize.STRING,
      },
      policyId: {
        type: Sequelize.STRING,
      },
      aboutId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MarkDowns");
  },
};
