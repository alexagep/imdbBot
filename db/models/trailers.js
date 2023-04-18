"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Trailer extends Model {
    static associate(models) {
      Trailer.belongsTo(models.Movie, {
        foreignKey: "MovieId",
        targetKey: "id",
      });
    }
  }

  Trailer.init(
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
      videoUrl: {
        type: DataTypes.STRING,
        field: "video_url",
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: false,
      modelName: "Trailer",
      timestamps: false,
    }
  );
  return Trailer;
};
