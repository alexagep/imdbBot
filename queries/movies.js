const db = require("../db/models/index");
const Sequelize = require("sequelize");

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
    const moviesArr = Array.isArray(movieData) ? movieData : [movieData];

    if (genreId) {
      for (const item of moviesArr) {
        const movie = {
          name: item.title,
          rating: item.imDbRating,
          imdbId: item.id,
          imageUrl: item.image,
          actors: [item.stars],
          genres: [item.genres],
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
      }

      console.log("New record created in Movie table", collector.length);
      return collector;
    }
  } catch (error) {
    console.error("Error updating/creating row in createMovie:", error.message);
  }
}

async function findMoviesBySearchQuery(searchQuery) {
  try {
    const movies = await Movie.findAll({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("name")),
        "LIKE",
        `%${searchQuery.toLowerCase()}%`
      ),
      order: [["totalVotes", "DESC"]],
    });


    return movies;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = {
  getAllMovie,
  updateMovieRow,
  createMovie,
  findMoviesBySearchQuery,
};
