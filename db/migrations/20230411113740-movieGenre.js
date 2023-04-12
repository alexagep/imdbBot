module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "MovieGenres",
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
          field: "movie_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: {
            model: "Movies",
            key: "id",
          },
        },
        GenreId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "genre_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: {
            model: "Genres",
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
