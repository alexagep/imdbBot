const { MovieGenre } = require("../models/movieGenres");
const { Movie } = require("../models/movies");
const { Genre } = require("../models/genres");
const { getGenre } = require("../queries/genres");

// const { getAllGenre } = require("./genres");

async function getAllMovieGenre(genreId) {
  const MovieGenreRow = await Movie.findAll({
    include: [
      {
        model: Genre,
        through: MovieGenre,
        where: { id: genreId }, // add your condition object here
      },
    ],
    // other options, such as order, limit, etc., can also be added
  });
  // const MovieGenreRow = await MovieGenre.findAll({ where: clause });
  return MovieGenreRow;
}

async function updateMovieGenreRow(data) {
  try {
    const result = await MovieGenre.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// USAGE: createMovieGenre({ data: { name: 'Example', value: 42 }, createdAt: new Date(), updatedAt: new Date() })
async function createMovieGenre(data, genreId) {
  try {
    const { id, genres } = data;
    const rows = [];
    for (const genreName of genres) {
      // const clause = { name : genreName }
      // const genre = await getGenre(clause)
      // console.log(genre, "GENRE");
      // if (genre.dataValues) {
      const movieGenre = await MovieGenre.create({
        movieId: id,
        genreId,
      });
      rows.push(movieGenre);
      // }
    }
    console.log(`Created ${rows.length} new records in MovieGenre table`);
    return rows;
  } catch (error) {
    console.error(
      "Error creating new records in MovieGenre table:",
      error.message
    );
    // throw error;
  }
}

module.exports = {
  getAllMovieGenre,
  updateMovieGenreRow,
  createMovieGenre,
};
