const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
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
    year: {
      type: DataTypes.INTEGER,
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
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    modelName: "Movie",
    underscored: true
  }
);

Movie.associate = function (models) {
  Movie.hasMany(models.MovieGenre, {
    foreignKey: "movie_id",
  });
};

module.exports = { Movie };
