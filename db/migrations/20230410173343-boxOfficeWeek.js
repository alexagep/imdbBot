"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BoxOfficeWeeks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      data: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("BoxOfficeWeeks");
  },
};
