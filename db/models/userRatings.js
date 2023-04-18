"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRating extends Model {
    static associate(models) {
      UserRating.belongsTo(models.Movie, {
        foreignKey: "MovieId",
        targetKey: "id",
      });
    }
  }

  UserRating.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: "movie_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Movies",
          key: "id",
        },
      },
      demographicAll: {
        type: DataTypes.JSONB,
        field: "demographic_all",
        allowNull: true,
      },
      demographicMales: {
        type: DataTypes.JSONB,
        field: "demographic_males",
        allowNull: true,
      },
      demographicFemales: {
        type: DataTypes.JSONB,
        field: "demographic_females",
        allowNull: true,
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
      paranoid: false,
      modelName: "UserRating",
    }
  );
  return UserRating;
};