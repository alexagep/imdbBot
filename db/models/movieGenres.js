"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MovieGenre extends Model {
    static associate(models) {
      MovieGenre.belongsTo(models.Genre, {
        foreignKey: "GenreId",
        targetKey: "id",
      });

      MovieGenre.belongsTo(models.Movie, {
        foreignKey: "MovieId",
        targetKey: "id",
      });
    }
  }

  MovieGenre.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      GenreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "genre_id",
        references: {
          model: "Genre",
          key: "id",
        },
      },
      MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "movie_id",
        references: {
          model: "Movie",
          key: "id",
        },
      },
    },
    {
      sequelize,
      paranoid: false,
      modelName: "MovieGenre",
      timestamps: false,
    }
  );
  return MovieGenre;
};
