const { MovieGenre } = require("../models/movieGenres");
const { Movie } = require("../models/movies");
const { Genre } = require("../models/genres");
const { getGenre } = require("../queries/genres");

// const { getAllGenre } = require("./genres");

// async function getAllMovieGenre(genreId) {
//   console.log(genreId);
//   try {
//     const MovieGenreRow = await Genre.findAll({
//       where: { id: genreId },
//       include: [
//         {
//           model: Movie,
//           include: { model: MovieGenre },
//         },
//       ],
//     });
//     return MovieGenreRow;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

async function getAllMovieGenre(genreId) {
  console.log(genreId);
  try {
    const genre = await Genre.findByPk(genreId);
    if (!genre) {
      throw new Error(`Genre not found with id ${genreId}`);
    }
    const movies = await genre.getMovies({
      include: [{ model: MovieGenre, include: [Genre] }],
    });
    return movies;
  } catch (error) {
    console.log(error.message);
  }
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
