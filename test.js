// const db = require("./db/models/index");
// const Movie = db.Movie;
// const Genre = db.Genre
// const MovieGenre = db.MovieGenre
// const { Op } = require("sequelize");
// // const stringSimilarity = require("string-similarity");

// async function getAllMovie() {
//   const MovieList = await Movie.findAll();
//   console.log(MovieList.length);
// }
// getAllMovie();

// async function getAllMovieGenre(genreId) {
//   // console.log(genreId);
//   try {
//     const MovieGenreRow = await Genre.findAll({
//       where: { id: genreId },
//       include: [
//         {
//           model: MovieGenre,
//           include: { model: Movie },
//         },
//       ],
//     });

//     const data = MovieGenreRow[0].dataValues.MovieGenres;

//     console.log(data.length, "MOVIEGENRE_FOUND_OR_NOT");
//     // return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// getAllMovieGenre(1)

// async function getAllMovieGenre(genreId, num) {
//   // console.log(genreId);
//   try {
//     const MovieGenreRow = await Genre.findAll({
//       where: { id: genreId },
//       include: [
//         {
//           model: MovieGenre,
//           include: { model: Movie },
//         },
//       ],
//     });

//     const data = MovieGenreRow[0].dataValues.MovieGenres;

//     console.log('genreId: ', num, '=>', data.length, "MOVIEGENRE_FOUND_OR_NOT");
//     // return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// getAllMovieGenre(1, '1')
// getAllMovieGenre(2, '2')
// getAllMovieGenre(3, '3')
// getAllMovieGenre(4, '4')
// getAllMovieGenre(5, '5')
// getAllMovieGenre(6, '6')
// getAllMovieGenre(7, '7')
// getAllMovieGenre(8, '8')
// getAllMovieGenre(9, '9')
// getAllMovieGenre(10, '10')
// getAllMovieGenre(11, '11')
// getAllMovieGenre(12, '12')
// getAllMovieGenre(13, '13')
// getAllMovieGenre(14, '14')
// getAllMovieGenre(15, '15')
// getAllMovieGenre(16, '16')
// getAllMovieGenre(17, '17')
// getAllMovieGenre(18, '18')
// getAllMovieGenre(19, '19')




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
// const serverDateTime = "2023-04-09T05:53:45.467Z";
// const dateNow = new Date();

// var _dtSvr = Date.parse(serverDateTime);
// var _dtTxt = Date.parse(dateNow);

// console.log((_dtTxt - _dtSvr) / one_day > 7);

// function isDatePassedBy7Days(serverDateTime) {
//   const one_day = 1000 * 60 * 60 * 24;
//   const dateNow = new Date();

//   const _dtSvr = Date.parse(serverDateTime);
//   const _dtTxt = Date.parse(dateNow);

//   return (_dtTxt - _dtSvr) / one_day > 7
// }
// console.log(isDatePassedBy7Days(serverDateTime));



// const arr = []

// obj.hello = {name: 'ali'}
// console.log(obj);


// const genres = [ 'Biography, Drama' ]


// console.log(genres[0].split(','));


// rateMessage = ``;

//       const imdbRate = `⭐️ IMDb Rating: \n`
//       const metacriticRate = `🌟 Metacritic Rating: /100\n`;
//       const rottenRate = `🍅 RottenTomatoes Rating: /100`;

//       if (arr.length > 1) {
//         rateMessage += imdbRate;
//       }
//       if (arr.length > 1) {
//         rateMessage += metacriticRate;
//       }
//       if (arr.length > 1) {
//         rateMessage += rottenRate;
//       }
//       if (rateMessage == '') {
//         console.log('here');
//       }
// console.log();


// const result = [{},{},{}]

// const arra = ['obj', 'obj2']

// const obj = {
//   res : [{},{},{}]
// }

// const obj2 = {
//   res : [{},{},{}]
// }

// const ovj = {
//   obj2 : {
//     res : [{},{},{}]
//   },
//   obj : {
//     res : [{},{},{}]
//   }
// }


// let collect = []

// let collect2 = []

// for (const arr of arra) {
  
//   collect.push(ovj[arr].res)

//   collect2 = [...collect2, ...ovj[arr].res]
// }

// // const col = [...result, ...collect]

// console.log(collect, collect2);


const num = "8.1"

console.log(parseFloat(num));
