const db = require("../db/models/index");

const MovieGenre = db.MovieGenre
const Movie = db.Movie
const Genre = db.Genre

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
    const MovieGenreRow = await Genre.findAll({
      where: { id: genreId },
      include: [
        {
          model: MovieGenre,
          include: { model: Movie },
        },
      ],
    });

    const data = MovieGenreRow[0].dataValues.MovieGenres

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

// async function getAllMovieGenre(genreId) {
//   console.log(genreId);
//   try {
//     const genre = await Genre.findByPk(genreId);
//     if (!genre) {
//       throw new Error(`Genre not found with id ${genreId}`);
//     }
//     const movies = await genre.getMovies({
//       include: [{ model: MovieGenre, include: [Genre] }],
//     });
//     return movies;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

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
