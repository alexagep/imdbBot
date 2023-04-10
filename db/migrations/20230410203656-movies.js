'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
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
      genres: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Movies')
  },
}
