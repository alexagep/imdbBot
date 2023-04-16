const db = require("../db/models/index");
const { createMovie } = require("./movies");

const Rating = db.Rating;
const Movie = db.Movie;

async function getAllRating(movieId) {
  try {
    const Row = await Movie.findAll({
      where: { id: movieId },
      include: [
        {
          model: Rating,
        },
      ],
    });

    const data = Row[0].dataValues;

    // console.log(RatingRow, "Rating_FOUND_OR_NOT");
    return data;
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

async function createRating(movies, genreId) {
  try {
    const movieRows = await createMovie(movies, genreId);

    for (const item of movieRows) {
      try {
        await Rating.findOrCreate({
          where: { MovieId: item.MovieId, GenreId: item.GenreId }, // criteria to find existing row
          defaults: item, // data to be used for creating new row
        });
      } catch (error) {
        console.error(
          `Error updating/creating row in createRating: `,
          error.message
        );
      }
    }
  } catch (error) {
    console.error(
      "Error creating new records in Rating table:",
      error.message
    );
    // throw error;
  }
}


module.exports = {
  getAllRating,
  updateRatingRow,
  createRating,
};
