// Create a Sequelize instance
const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../db/connection');

// Define your models
class Top250 extends Model {}
Top250.init(
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
    modelName: 'Top250',
    underscored: true
  }
);

// Define your associations
Top250.associate = function (models) {};

module.exports = {
  Top250,
};
