
const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../db/connection');

// Define your models
class Movie extends Model {}
Movie.init(
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
    modelName: 'Movie',
  }
);

// Define your associations
Movie.associate = function (models) {};

module.exports = {
  Movie,
};
