
const { Model } = require("sequelize");

// Define your models
module.exports = (sequelize, DataTypes) => {
  class BoxOfficeWeek extends Model {
    static associate(models) {}
  }

  BoxOfficeWeek.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      data: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'BoxOfficeWeek',
      paranoid: false,
    }
  );
  return BoxOfficeWeek;
};