module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Genres",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Genres");
  },
};
