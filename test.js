const db = require("./db/models/index");
const Movie = db.Movie;
const Genre = db.Genre;
const MovieGenre = db.MovieGenre;
const { Op } = require("sequelize");
require("dotenv").config();

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

// async function getAllMovie() {
//   const MovieList = await Movie.findAll();
//   console.log(MovieList.length);
// }
// getAllMovie();

async function generateRecommendation() {
  try {
    const IMDB_API_KEY3 = process.env.imdbAPIKEY3;

    for (const genre of genres) {
      const urls = [
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.0,8.0&genres=${genre}&certificates=us:G&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.0,8.0&genres=${genre}&certificates=us:PG&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.0,8.0&genres=${genre}&certificates=us:PG-13&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.0,8.0&genres=${genre}&certificates=us:R&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.0,8.0&genres=${genre}&certificates=us:NC-17&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.0,6.3&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.4,6.7&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.8,7.0&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.1,7.4&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.5,7.8&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.9,8.2&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=8.3,8.5&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=8.5,9.0&genres=${genre}&languages=en&count=250`,
      ];
      let collector = [];

      for (const url of urls) {
        const urResponse = await fetch(url);
        const res = await urResponse.json();

        console.log(res.results.length, "res.results.length");

        collector = [...collector, ...res.results];
      }
      console.log(collector.length, "collector.length");

      await createMovieGenre(collector, genreId);
    }
  } catch (error) {
    console.log("error in generateRecommendation", error.message);
  }
}
generateRecommendation();
