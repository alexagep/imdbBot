const {Movie} = require('../models/movies');
const {Genre} = require('../models/genres');
const {MovieGenre} = require('../models/movieGenres');

// Movie and Genre have a many-to-many relationship through MovieGenre
Movie.belongsToMany(Genre, { through: MovieGenre, foreignKey: 'MovieId' });
Genre.belongsToMany(Movie, { through: MovieGenre, foreignKey: 'GenreId' });

// Optional: Define additional associations between Movie, Genre, and MovieGenre
// For example, if you want to establish a one-to-many relationship between MovieGenre and Movie/Genre, you can use:
MovieGenre.belongsTo(Movie, { foreignKey: 'MovieId' });
MovieGenre.belongsTo(Genre, { foreignKey: 'GenreId' });

// Sync the models with the database
//sequelize.sync({ force: false }); // Set force to true to drop and recreate tables on every sync

// Export your models
module.exports = { Movie, Genre, MovieGenre };
