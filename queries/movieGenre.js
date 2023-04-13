const db = require("../db/models/index");
const { createMovie } = require("./movies");

const MovieGenre = db.MovieGenre;
const Movie = db.Movie;
const Genre = db.Genre;

async function getAllMovieGenre(genreId) {
  // console.log(genreId);
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

    const data = MovieGenreRow[0].dataValues.MovieGenres;

    // console.log(MovieGenreRow, "MOVIEGENRE_FOUND_OR_NOT");
    return data;
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

async function createMovieGenre(movies, genreId) {
  try {

    const movieRows = await createMovie(movies, genreId);

    console.log(movieRows[0], 'test here');
    // const movieId = movie.id


    for (const item of movieRows) {
      try {
        await MovieGenre.findOrCreate({
          where: { MovieId: item.MovieId, GenreId: item.GenreId }, // criteria to find existing row
          defaults: item, // data to be used for creating new row
        });

      } catch (error) {
        console.error(
          `Error updating/creating row in createMovieGenre: `,
          error.message
        );
      }
    }
    // const movieData = movieRows.map((movieRow) => {
    //   // if (movieRow.id && movieRow.id !== null) {
    //     return {
    //       MovieId: movieRow.dataValues.id,
    //       GenreId: genreId,
    //     };
    //   // }
    // });

    // const filteredMovieData = movieData.filter((movie) => movie?.MovieId !== null);

    // console.log(filteredMovieData);

    // console.log(movieData);

    // const createdMovieGenreRows = await MovieGenre.bulkCreate(movieData, { ignoreDuplicates: true });

    // const row = await MovieGenre.create({
    //   MovieId: movieId,
    //   GenreId: genreId,
    // });

    // console.log(
    //   `Created new records in MovieGenre table`,
    //   createdMovieGenreRows.length
    // );
    // return createdMovieGenreRows;
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
