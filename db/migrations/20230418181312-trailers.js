module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Trailers",
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
        videoUrl: {
          type: Sequelize.STRING,
          field: "video_url",
          allowNull: true,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Trailers");
  },
};
