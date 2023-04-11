const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

// Define your models
class MovieGenre extends Model {}
MovieGenre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
  },
  {
    sequelize,
    timestamps: false, // Disable createdAt and updatedAt fields
    modelName: "MovieGenre",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["movie_id", "genre_id"],
      },
    ],
  }
);

// Define your associations
// MovieGenre.associate = function (models) {
//   // Define a many-to-one association between MovieGenre and Movie
//   MovieGenre.belongsTo(models.Movie, {
//     foreignKey: "MovieId",
//     targetKey: 'id',
//   });

//   // Define a many-to-one association between MovieGenre and Genre
//   MovieGenre.belongsTo(models.Genre, {
//     foreignKey: "GenreId",
//     targetKey: 'id',
//   });
// };

module.exports = MovieGenre;
