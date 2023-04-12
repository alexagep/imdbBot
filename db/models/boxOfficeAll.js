
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class BoxOfficeAllTime extends Model {
    static associate(models) {}
  }

  BoxOfficeAllTime.init(
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
      modelName: 'BoxOfficeAllTime',
      paranoid: false,
    }
  );
  return BoxOfficeAllTime;
};