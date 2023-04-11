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
            fields: ["api_key_id", "service_id"],
          },
        },
        timestamps: false, // Disable timestamps fields
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("movieGenres");
  },
};
