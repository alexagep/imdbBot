const db = require("../db/models/index");
const { createMovie } = require("./movies");

const Rating = db.Rating;
const Movie = db.Movie;

async function getAllRating(movieId) {
  try {
    const Row = await Rating.findAll({
      where: { MovieId: movieId },
    });

    console.log(Row, "Rating_FOUND_OR_NOT");

    const data = Row;

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function createMovieRating(movie, ratings, genreIds) {
  try {
    const genres = [
      "comedy",
      "sci-fi",
      "romance",
      "thriller",
      "horror",
      "action",
      "drama",
      "fantasy",
      "adventure",
      "animation",
      "crime",
      "documentary",
      "family",
      "history",
      "music",
      "mystery",
      "sport",
      "war",
      "western",
    ];

    if (genreIds) {
      genreIds = genreIds.split(",");

      for (let genreId of genreIds) {
        genreId = genres.indexOf(genreId.toLowerCase()) + 1;

        const movieRows = await createMovie(movie, genreId);

        const ratingRow = await createRating(ratings, movieRows[0].MovieId);

        console.log(ratingRow, "RATING_CREATED");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function updateRatingRow(data) {
  try {
    const result = await Rating.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function createRating(ratings, movieId) {
  try {
    const item = {
      metacriticRating: ratings.metacritic,
      rottenRating: ratings.rottenTomatoes,
      imdbRating: ratings.imDb,
    };

    await Rating.findOrCreate({
      where: {
        MovieId: movieId,
      }, // criteria to find existing row
      defaults: item, // data to be used for creating new row
    });

    console.log("********", ratings);
  } catch (error) {
    console.error("Error creating new records in Rating table:", error.message);
    // throw error;
  }
}

module.exports = {
  getAllRating,
  updateRatingRow,
  createRating,
  createMovieRating,
};
