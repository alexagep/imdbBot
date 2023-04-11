module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Genres",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: false, // Disable createdAt and updatedAt fields
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Genres");
  },
};