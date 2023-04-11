"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movies", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      director: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      imdbId: {
        type: Sequelize.STRING,
        field: "imdb_id",
        allowNull: true,
        unique: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
        field: "image_url",
        allowNull: true,
      },
      actors: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      runtime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contentRating: {
        type: Sequelize.STRING,
        field: "content_rating",
        allowNull: true,
      },
      totalVotes: {
        type: Sequelize.INTEGER,
        field: "total_votes",
        allowNull: true,
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
    await queryInterface.dropTable("Movies");
  },
};