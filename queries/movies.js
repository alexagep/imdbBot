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
async function createMovie(movieData, genreId) {
  try {
    console.log(movieData.length, "LENGTH_OF_FOUND_MOVIES");

    let collector = [];
    let failed = 0;
    for (const item of movieData) {
      try {
        // console.log(item);
        // if (!item.name) {
        //   failed += 1
        // }
        const movie = {
          name: item.title,
          rating: item.imDbRating,
          imdbId: item.id,
          imageUrl: item.image,
          actors: item.stars,
          genres: item.genres,
          runtime: item.runtimeStr,
          contentRating: item.contentRating,
          totalVotes: item.imDbRatingVotes,
          year: item.description,
          plot: item.plot,
        };

        const [row] = await Movie.findOrCreate({
          where: { imdbId: item.id }, // criteria to find existing row
          defaults: movie, // data to be used for creating new row
        });

        collector.push({ MovieId: row.dataValues.id, GenreId: genreId });
      } catch (error) {
        console.error(
          `Error updating/creating row in createMovie: `,
          error.message
        );
      }
    }

    console.log("New record created in Movie table", collector.length);
    return collector;
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
