const db = require("../db/models/index");
const { createMovie } = require("./movies");
const { Op } = require("sequelize");

const MovieGenre = db.MovieGenre;
const Movie = db.Movie;
const Genre = db.Genre;

async function getAllMovieGenre(genreId) {
  // console.log(genreId);
  try {
    const MovieGenreRow = await Genre.findAll({
      where: { id: genreId },
      include: [
        {
          model: MovieGenre,
          include: [
            {
              model: Movie,
              where: {
                rating: {
                  [Op.gt]: 6.7, // Only retrieve movies with a rating over 6.7
                },
                totalVotes: {
                  [Op.gt]: 1200, // Only retrieve movies with a totalVotes over 1200
                },
                contentRating: {
                  [Op.in]: ["G", "PG", "PG-13", "R", "NC-17"], // Only retrieve movies with these content ratings
                },
              },
            },
          ],
        },
      ],
    });

    const data = MovieGenreRow[0].dataValues.MovieGenres;

    // console.log(MovieGenreRow, "MOVIEGENRE_FOUND_OR_NOT");
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateMovieGenreRow(data) {
  try {
    const result = await MovieGenre.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function createMovieGenre(movies, genreId) {
  try {
    if (genreId) {
      const movieRows = await createMovie(movies, genreId);

      for (const item of movieRows) {
        try {
          await MovieGenre.findOrCreate({
            where: { MovieId: item.MovieId, GenreId: item.GenreId }, // criteria to find existing row
            defaults: item, // data to be used for creating new row
          });
        } catch (error) {
          console.error(
            `Error updating/creating row in createMovieGenre: `,
            error.message
          );
        }
      }
    }
  } catch (error) {
    console.error(
      "Error creating new records in MovieGenre table:",
      error.message
    );
    // throw error;
  }
}

async function createMovieGenreWithFetchingGenreId(movie) {
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

    // for (const movie of movies) {
    const genresArr = Array.isArray(movie.genres)
      ? movie.genres
      : [movie.genres];
    for (const genreName of genresArr) {
      if (genreName !== null) {
        const genreId = genres.indexOf(genreName.toLowerCase()) + 1;

        // console.log(genreName);
        const movieRows = await createMovie(movies, genreId);

        for (const item of movieRows) {
          try {
            await MovieGenre.findOrCreate({
              where: { MovieId: item.MovieId, GenreId: item.GenreId }, // criteria to find existing row
              defaults: item, // data to be used for creating new row
            });
          } catch (error) {}
        }
      }
    }
    // }
  } catch (error) {
    console.error(
      "Error creating new records in MovieGenre table:",
      error.message
    );
    // throw error;
  }
}

module.exports = {
  getAllMovieGenre,
  updateMovieGenreRow,
  createMovieGenre,
  createMovieGenreWithFetchingGenreId,
};
