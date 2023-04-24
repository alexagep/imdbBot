const db = require("./db/models/index");
const Movie = db.Movie;
const Genre = db.Genre;
const MovieGenre = db.MovieGenre;
const { Op } = require("sequelize");

async function getAllMovie() {
  const MovieList = await Movie.findAll();
  console.log(MovieList.length);
}
getAllMovie();

async function getAllSeries() {
  try {
    const MovieGenreRow = await Genre.findAll({
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
                  [Op.in]: ["TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"], // Only retrieve movies with these content ratings
                },
              },
            },
          ],
        },
      ],
    });

    const data = MovieGenreRow[0].MovieGenres;

    console.log(data.length, "SERIES_FOUND_OR_NOT");
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

getAllSeries();

async function getAllMovieGenre() {
  // console.log(genreId);
  try {
    const MovieGenreRow = await Genre.findAll({
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

getAllMovieGenre();
