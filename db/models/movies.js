'use strict';

const { Model } = require('sequelize');

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
      year: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: false,
      modelName: 'Movie',
      timestamps: false,
    }
  );
  return Movie;
};
