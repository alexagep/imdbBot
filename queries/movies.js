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
async function createMovie(data, genreId) {
  try {
    console.log(data.length, "LENGTH_OF_FOUND_MOVIES");
    const movieData = {
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
    };

    let collector = [];
    for (const item of movieData) {
      try {
        const [row] = await Movie.findOrCreate({
          where: { imdbId: item.id }, // criteria to find existing row
          defaults: item, // data to be used for creating new row
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
