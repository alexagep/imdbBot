const fetch = require("node-fetch");
require("dotenv").config();


const IMDB_API_KEY = process.env.imdbAPIKEY;


const { createMovieGenre } = require("./queries/movieGenre");


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





async function fetchingDataFromApiAndInsertToDB(genres, IMDB_API_KEY) {
    for (const genre of genres) {
      const urls = [
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=6.0,6.3&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=6.3,6.6&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=6.6,6.9&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=6.9,7.2&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=7.2,7.5&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=7.5,7.8&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=7.8,8.0&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=8.0,8.3&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=8.3,8.6&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=8.6,8.9&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=8.6,8.9&genres=${genre}&languages=en&count=250`,
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=9.2,9.5&genres=${genre}&languages=en&count=250`,
      ];
      for (const url of urls) {
        const urResponse = await fetch(url);
        const res = await urResponse.json();
  
  // console.log(res)
  
        for (const result of res.results) {
          const genreId = genres.indexOf(result.genres.split(',')[0].toLowerCase()) + 1;
  //console.log(genres.indexOf(result.genres.split(',')[0]))
          await createMovieGenre(result, genreId);
        }
  
      }
    }
  }
  
  fetchingDataFromApiAndInsertToDB(genres, IMDB_API_KEY);
  