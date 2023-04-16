const db = require("./db/models/index");
const Movie = db.Movie;
const { Op } = require("sequelize");
// const stringSimilarity = require("string-similarity");

async function getAllMovie() {
  const MovieList = await Movie.findAll();
  console.log(MovieList.length);
}
getAllMovie();




async function getAllRating() {
 try {
   const Row = await Movie.findAll();

   console.log(Row.length, "Rating_FOUND_OR_NOT");
 } catch (error) {
   console.log(error.message);
 }
}

getAllRating()


// // const searchQuery = "Slave";
// // Movie.findAll({
// //   where: {
// //     name: { [Op.like]: `${searchQuery}%` },
// //   },
// //   order: [["totalVotes", "DESC"]],
// // })
// //   .then((movies) => {
// //     movies.forEach((movie) => {
// //       console.log(movie.dataValues);
// //     });
// //   })
// //   .catch((error) => {
// //     console.error("Error:", error);
// //   });

// // async function findMoviesBySearchQuery(searchQuery) {
// //   try {
// //     // const searchQuery = "Slave";
// //     console.log(searchQuery);
// //     const movies = await Movie.findAll({
// //       where: {
// //         name: { [Op.like]: `%${searchQuery}%` },
// //       },
// //       order: [["totalVotes", "DESC"]],
// //     });

// //     movies.forEach((movie) => {
// //       console.log(movie.dataValues);
// //     });

// //     return movies;
// //   } catch (error) {
// //     console.error("Error:", error.message);
// //   }
// // }

// // findMoviesBySearchQuery('batman')

// // const genre = "Action, Adventure, Sci-Fi"

// // console.log(genre.split(','));

// const items = [
//   {
//     id: 8644,
//     name: "12 Years a Slave",
//     rating: 8.1,
//     imdbId: "tt2024544",
//     imageUrl:
//       "https://m.media-amazon.com/images/M/MV5BMjExMTEzODkyN15BMl5BanBnXkFtZTcwNTU4NTc4OQ@@._V1_Ratio0.6837_AL_.jpg",
//     actors: [
//       "Steve McQueen, Chiwetel Ejiofor, Michael Kenneth Williams, Michael Fassbender, Brad Pitt",
//     ],
//     genres: ["Biography, Drama, History"],
//     runtime: "134 min",
//     contentRating: "R",
//     totalVotes: 712405,
//     year: "(2013)",
//     plot: "In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.",
//   },
//   {
//     id: 10083,
//     name: "Enslaved: Odyssey to the West",
//     rating: 8,
//     imdbId: "tt1753783",
//     imageUrl:
//       "https://m.media-amazon.com/images/M/MV5BMWY5YWZhNjctZjc5NC00Y2M4LTg0NzQtNmY4MzY3Yzk5ZGEyXkEyXkFqcGdeQXVyOTQxNzM2MjY@._V1_Ratio0.7041_AL_.jpg",
//     actors: [
//       "Nina Kristensen, Andy Serkis, Lindsey Shaw, Richard Ridings, Ryan McCluskey",
//     ],
//     genres: ["Action, Adventure, Sci-Fi"],
//     runtime: null,
//     contentRating: "T",
//     totalVotes: 1635,
//     year: "(2010 Video Game)",
//     plot: "Loosely based on the classic Chinese novel 'Journey to the West', players are cast as Monkey; a strong, brutish loner who is forced to partner with the tech-savvy yet physically weak Trip on a journey to freedom.",
//   },
// ];

// function findMovie() {
//   const movieTitle = "Slave";
//   const movies = [];
//   items.map((item) => {
//     const similarityScore = stringSimilarity.compareTwoStrings(
//       movieTitle,
//       item.name
//     );

//     console.log(similarityScore);
//     if (similarityScore >= 0.25) {
//       movies.push(item);
//     }
//   });

//   if (!(movies.length > 3)) {
//     console.log(movies);
//   }
// }
// findMovie();

// // const movie = items.find((movie) => {
// //   if (movie.imdbId === "tt1753783") {
// //     return movie;
// //   }
// // });

// // console.log(movie);

// // const text = "Slave so";

// // const match = text.match(/\bslave[a-zA-Z]*\b/); //  /^slave.*$/

// // if (match) {
// //   console.log("match");
// // } else {
// //   console.log("not");
// // }

// // _%${searchTerm}%

// const one_day = 1000 * 60 * 60 * 24;
const serverDateTime = "2023-04-15 11:44:46";
// const dateNow = new Date();

// var _dtSvr = Date.parse(serverDateTime);
// var _dtTxt = Date.parse(dateNow);

// console.log((_dtTxt - _dtSvr) / one_day > 7);

function isDatePassedBy7Days(serverDateTime) {
  const one_day = 1000 * 60 * 60 * 24;
  const dateNow = new Date();

  const _dtSvr = Date.parse(serverDateTime);
  const _dtTxt = Date.parse(dateNow);

  return (_dtTxt - _dtSvr) / one_day > 7
}
console.log(isDatePassedBy7Days(serverDateTime));