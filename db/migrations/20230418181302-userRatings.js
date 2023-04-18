module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "UserRatings",
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
        demographicAll: {
          type: Sequelize.JSONB,
          field: "demographic_all",
          allowNull: true,
        },
        demographicMales: {
          type: Sequelize.JSONB,
          field: "demographic_males",
          allowNull: true,
        },
        demographicFemales: {
          type: Sequelize.JSONB,
          field: "demographic_females",
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
    await queryInterface.dropTable("UserRatings");
  },
};
