'use strict';

const { Model } = require("sequelize");

// Define your models
module.exports = (sequelize, DataTypes) => {
  class Top250TV extends Model {
    static associate(models) {}
  }

  Top250TV.init(
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
      modelName: 'Top250TV',
      paranoid: false,
    }
  );
  return Top250TV;
};