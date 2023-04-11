"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "MovieGenres",
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
          references: {
            model: "Movie",
            key: "id",
          },
        },
        genreId: {
          type: Sequelize.INTEGER,
          field: "genre_id",
          allowNull: false,
          references: {
            model: "Genre",
            key: "id",
          },
        },
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ["genre_id", "movie_id"],
          },
        },
        timestamps: false, // Disable timestamps fields
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MovieGenres");
  },
};
