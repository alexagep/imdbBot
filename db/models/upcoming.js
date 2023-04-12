'use strict';

const { Model } = require("sequelize");

// Define your models
module.exports = (sequelize, DataTypes) => {
  class Upcoming extends Model {
    static associate(models) {}
  }

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
      paranoid: false,
    }
  );
  return Upcoming;
};