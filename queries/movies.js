const db = require("../db/models/index");

const Movie = db.Movie

async function getAllMovie() {
  const MovieList = await Movie.findAll();
  return MovieList;
}

async function updateMovieRow(data) {
  try {
    const result = await Movie.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// USAGE: createMovie({ data: { name: 'Example', value: 42 }, createdAt: new Date(), updatedAt: new Date() })
async function createMovie(data) {
  try {
    console.log(data);
    const row = await Movie.create({
      name: data.title,
      director: data.director,
      rating: data.imDbRating,
      imdbId: data.id,
      imageUrl: data.image,
      actors: data.stars,
      year: data.year,
      runtime: data.runtimeStr,
      contentRating: data.contentRating,
      totalVotes: data.imDbRatingVotes,
    });
    console.log("New record created in Movie table");
    return row;
  } catch (error) {
    console.error("Error creating new record in Movie table:", error.message);
    // throw error;
  }
}


module.exports = {
  getAllMovie,
  updateMovieRow,
  createMovie,
};
