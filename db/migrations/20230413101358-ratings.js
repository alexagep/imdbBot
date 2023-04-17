module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Ratings",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        MovieId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          field: "movie_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: {
            model: "Movies",
            key: "id",
          },
        },
        imdbRating: {
          type: Sequelize.STRING,
          field: "imdb_rating",
          allowNull: true,
        },
        metacriticRating: {
          type: Sequelize.STRING,
          field: "metacritic_rating",
          allowNull: true,
        },
        rottenRating: {
          type: Sequelize.STRING,
          field: "rotten_rating",
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
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Ratings");
  },
};
