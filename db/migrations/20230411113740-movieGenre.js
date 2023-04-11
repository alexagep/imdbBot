'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movieGenres', {
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
      createdAt: false, // Disable createdAt field
      updatedAt: false, // Disable updatedAt field
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('movieGenres')
  },
}
