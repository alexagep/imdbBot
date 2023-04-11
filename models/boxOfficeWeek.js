
const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../db/connection');

// Define your models
class BoxOfficeWeek extends Model {}
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
    underscored: true
  }
);

// Define your associations
BoxOfficeWeek.associate = function (models) {};

module.exports = {
  BoxOfficeWeek,
};
