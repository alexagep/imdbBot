const db = require("../db/models/index");

const UserRating = db.UserRating;
const Movie = db.Movie;

async function getAllUserRating(movieId) {
  try {
    const Row = await UserRating.findAll({
      where: { MovieId: movieId },
    });

    console.log(Row, "UserRating_FOUND_OR_NOT");

    // const data = Row;

    return Row.dataValues;
  } catch (error) {
    console.log(error.message);
  }
}

async function createMovieUserRating(movie, UserRatings, genreIds) {
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

        const UserRatingRow = await createUserRating(
          UserRatings,
          movieRows[0].MovieId
        );

        console.log(UserRatingRow, "UserRating_CREATED");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function updateUserRatingRow(data, movieId) {
  try {
    const result = await UserRating.update(
      {
        metacriticUserRating: data.metacritic,
        rottenUserRating: data.rottenTomatoes,
        imdbUserRating: data.imDb,
      },
      { where: { MovieId: movieId } }
    );
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function createUserRating(data, movieId) {
  try {
    const item = {
      demographicMales: data.demographicMales,
      demographicFemales: data.demographicFemales,
      demographicAll: data.demographicAll,
      MovieId: movieId
    };

    await UserRating.create(item);

  } catch (error) {
    console.error(
      "Error creating new records in UserRating table:",
      error.message
    );
    // throw error;
  }
}

module.exports = {
  getAllUserRating,
  updateUserRatingRow,
  createUserRating,
  createMovieUserRating,
};
