const db = require("../db/models/index");

const Movie = db.Movie;

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
    console.log(data.length, 'LENGTH_OF_FOUND_MOVIES');
    // const movieData = {
    //   name: row.title,
    //   rating: row.imDbRating,
    //   imdbId: row.id,
    //   imageUrl: row.image,
    //   actors: [row.stars],
    //   year: row.description,
    //   genres: [row.genres],
    //   runtime: row.runtimeStr,
    //   contentRating: row.contentRating,
    //   totalVotes: row.imDbRatingVotes,
    //   plot: row.plot,
    // };

    const movieData = data.map((row) => {
      return {
        name: row.title,
        rating: row.imDbRating,
        imdbId: row.id,
        imageUrl: row.image,
        actors: [row.stars],
        year: row.description,
        genres: [row.genres],
        runtime: row.runtimeStr,
        contentRating: row.contentRating,
        totalVotes: row.imDbRatingVotes,
        plot: row.plot,
      }
    });

    const createdTableRows = await Movie.bulkCreate(movieData, { ignoreDuplicates: true });
    // const row = await Movie.create({
    //   name: data.title,
    //   rating: data.imDbRating,
    //   imdbId: data.id,
    //   imageUrl: data.image,
    //   actors: [data.stars],
    //   year: data.description,
    //   genres: [data.genres],
    //   runtime: data.runtimeStr,
    //   contentRating: data.contentRating,
    //   totalVotes: data.imDbRatingVotes,
    //   plot: data.plot,
    // });
    console.log("New record created in Movie table");
    return createdTableRows;
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
