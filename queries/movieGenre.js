const { MovieGenre } = require("../models/movieGenres");
const { Genre } = require("../models/genres");

const { getAllGenre } = require("./genres");

async function getAllMovieGenre() {
  const MovieGenreList = await MovieGenre.findAll();
  return MovieGenreList;
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
async function createMovieGenre(data) {
  try {
    const { id, genres } = data;
    const rows = [];
    for (const genreName of genres) {
      const clause = { name : genreName }
      const genre = await getAllGenre(clause)
      console.log(genre, "GENRE");
      if (genre.dataValues) {
        const movieGenre = await MovieGenre.create({
          movieId: id,
          genreId: genre.id,
        });
        rows.push(movieGenre);
      }
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
