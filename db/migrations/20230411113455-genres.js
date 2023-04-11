module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Genres', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: false, // Disable createdAt field
      updatedAt: false, // Disable updatedAt field
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Genres');
  },
};
