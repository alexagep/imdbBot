const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

// Define your models
class Genre extends Model {}
Genre.init(
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
  },
  {
    sequelize,
    timestamps: false, // Disable createdAt and updatedAt fields
    modelName: "Genre",
  }
);

// Define your associations
Genre.associate = function (models) {
  Genre.hasMany(models.MovieGenre, {
    foreignKey: "genre_id",
  });
};

module.exports = {
  Genre,
};
