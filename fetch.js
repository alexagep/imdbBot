require("dotenv").config();
const { createMovieGenre } = require("./queries/movieGenre");
const fetch = require("node-fetch");

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

async function generateRecommendation() {
  try {
    const IMDB_API_KEY3 = process.env.imdbAPIKEY3;

    for (const genre of genres) {
      const urls = [
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.5,&genres=${genre}&num_votes=2000,&certificates=us:G&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.5,&genres=${genre}&num_votes=2000,&certificates=us:PG&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.5,&genres=${genre}&num_votes=2000,&certificates=us:PG-13&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.5,&genres=${genre}&num_votes=2000,&certificates=us:R&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.5,&genres=${genre}&num_votes=2000,&certificates=us:NC-17&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.0,6.3&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.4,6.7&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=6.8,7.0&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.1,7.4&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.5,7.8&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=7.9,8.2&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=8.3,8.5&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?user_rating=8.5,9.0&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
      ];

      let collector = [];

      for (const url of urls) {
        const urResponse = await fetch(url);
        const res = await urResponse.json();

        console.log(res.results.length, "res.results.length");

        collector = [...collector, ...res.results];
      }

      const genreId = genres.indexOf(genre) + 1; // Get the id of the chosen genre

      console.log(collector.length, "collector.length");

      await createMovieGenre(collector, genreId);
    }
  } catch (error) {
    console.log("error in generateRecommendation", error.message);
  }
}
generateRecommendation();

async function generateRecommendationTV() {
  try {
    const IMDB_API_KEY3 = process.env.imdbAPIKEY2;

    for (const genre of genres) {
      const urls = [
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?title_type=tv_movie&user_rating=6.0,&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?title_type=tv_series&user_rating=6.0,&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?title_type=,tv_episode&user_rating=6.0,&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?title_type=tv_special&user_rating=6.0,&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?title_type=tv_miniseries&user_rating=6.0,&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY3}?title_type=tv_short&user_rating=6.0,&genres=${genre}&num_votes=2000,&languages=tr&count=250`,
      ];
      let collector = [];

      for (const url of urls) {
        const urResponse = await fetch(url);
        const res = await urResponse.json();

        console.log(res.results.length, "res.results.length");

        collector = [...collector, ...res.results];
      }

      const genreId = genres.indexOf(genre) + 1; // Get the id of the chosen genre

      console.log(collector.length, "collector.length");

      await createMovieGenre(collector, genreId);
    }
  } catch (error) {
    console.log("error in generateRecommendationTV", error.message);
  }
}
generateRecommendationTV();
