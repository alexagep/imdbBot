'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.hasMany(models.MovieGenre);
    }
  }

  Genre.init(
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
        unique: true,
      },
    },
    {
      sequelize,
      paranoid: false,
      modelName: 'Genre',
      timestamps: false,
    }
  );
  return Genre;
};
