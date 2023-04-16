"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.Movie, {
        foreignKey: "MovieId",
        targetKey: "id",
      });
    }
  }

  Rating.init(
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
        field: "movie_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Movies",
          key: "id",
        },
      },
      imdbRating: {
        type: DataTypes.STRING,
        field: "imdb_rating",
        allowNull: true,
      },
      metacriticRating: {
        type: DataTypes.STRING,
        field: "metacritic_rating",
        allowNull: true,
      },
      rottenRating: {
        type: DataTypes.STRING,
        field: "rotten_rating",
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
      modelName: "Rating",
    }
  );
  return Rating;
};