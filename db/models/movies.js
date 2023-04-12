"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.hasMany(models.MovieGenre);
    }
  }

  Movie.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      imdbId: {
        type: DataTypes.STRING,
        field: "imdb_id",
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        field: "image_url",
        allowNull: true,
        unique: true, // add unique constraint
      },
      actors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      runtime: {
        type: DataTypes.STRING,
      },
      contentRating: {
        type: DataTypes.STRING,
        field: "content_rating",
      },
      totalVotes: {
        type: DataTypes.INTEGER,
        field: "total_votes",
      },
      year: {
        type: DataTypes.STRING,
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
      paranoid: false,
      modelName: "Movie",
    }
  );
  return Movie;
};