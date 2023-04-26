const db = require("../db/models/index");
const { createMovie } = require("./movies");

const Trailer = db.Trailer;
const Movie = db.Movie;

async function getAllTrailer(movieId) {
  try {
    const Row = await Trailer.findAll({
      where: { MovieId: movieId },
    });

    console.log(Row, "Trailer_FOUND_OR_NOT");

    const data = Row;

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function createMovieTrailer(movie, Trailers, genreIds) {
  try {
    if (genreIds) {
      genreIds = genreIds.split(",");

      for (let genreId of genreIds) {
        genreId = genres.indexOf(genreId.toLowerCase()) + 1;

        const movieRows = await createMovie(movie, genreId);

        const TrailerRow = await createTrailer(Trailers, movieRows[0].MovieId);

        console.log(TrailerRow, "Trailer_CREATED");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function updateTrailerRow(data, movieId) {
  try {
    const result = await Trailer.update(
      {
        metacriticTrailer: data.metacritic,
        rottenTrailer: data.rottenTomatoes,
        imdbTrailer: data.imDb,
      },
      { where: { MovieId: movieId } }
    );
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function createTrailer(videoUrl, movieId) {
  try {
    const item = {
      videoUrl: videoUrl,
      MovieId: movieId,
    };

    await Trailer.findOrCreate({
      where: {
        MovieId: movieId,
      }, // criteria to find existing row
      defaults: item, // data to be used for creating new row
    });

  } catch (error) {
    console.error(
      "Error creating new records in Trailer table:",
      error.message
    );
    // throw error;
  }
}

module.exports = {
  getAllTrailer,
  updateTrailerRow,
  createTrailer,
  createMovieTrailer,
};
