const db = require("../db/models/index");
const { createMovie } = require("./movies");

const Rating = db.Rating;
const Movie = db.Movie;

async function getAllRating(movieId) {
  try {
    const Row = await Movie.findAll({
      where: { imdbId: movieId },
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

    console.log('********', ratings);
  } catch (error) {
    console.error("Error creating new records in Rating table:", error.message);
    // throw error;
  }
}

module.exports = {
  getAllRating,
  updateRatingRow,
  createRating,
};
