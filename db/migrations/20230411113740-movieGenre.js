"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "movieGenres",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        movieId: {
          type: Sequelize.INTEGER,
          field: "movie_id",
          allowNull: false,
        },
        genreId: {
          type: Sequelize.INTEGER,
          field: "genre_id",
          allowNull: false,
        },
      },
      {
        timestamps: false, // Disable timestamps fields
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("movieGenres");
  },
};
