
const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../db/connection');

// Define your models
class Upcoming extends Model {}
Upcoming.init(
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
    modelName: 'Upcoming',
  }
);

// Define your associations
Upcoming.associate = function (models) {};

module.exports = {
  Upcoming,
};
