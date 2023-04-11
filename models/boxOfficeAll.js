
const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../db/connection');

// Define your models
class BoxOfficeAllTime extends Model {}
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
    underscored: true
  }
);

// Define your associations
BoxOfficeAllTime.associate = function (models) {};

module.exports = {
  BoxOfficeAllTime,
};
