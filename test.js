// const db = require("./db/models/index");
// const Movie = db.Movie;
// const { Op } = require("sequelize");

// async function getAllMovie() {
//   const MovieList = await Movie.findAll();
//   console.log(MovieList.length);
// }
// getAllMovie();

// const searchQuery = "Slave";
// Movie.findAll({
//   where: {
//     name: { [Op.like]: `%${searchQuery}%` },
//   },
//   order: [["totalVotes", "DESC"]],
// })
//   .then((movies) => {
//     movies.forEach((movie) => {
//       console.log(movie.dataValues);
//     });
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });



//   // async function findMoviesBySearchQuery(searchQuery) {
//   //   try {
//   //     // const searchQuery = "Slave";
//   //     console.log(searchQuery);
//   //     const movies = await Movie.findAll({
//   //       where: {
//   //         name: { [Op.like]: `%${searchQuery}%` },
//   //       },
//   //       order: [["totalVotes", "DESC"]],
//   //     });
  
//   //     movies.forEach((movie) => {
//   //       console.log(movie.dataValues);
//   //     });
  
//   //     return movies;
//   //   } catch (error) {
//   //     console.error("Error:", error.message);
//   //   }
//   // }
  
//   // findMoviesBySearchQuery('batman')


const genre = "Action, Adventure, Sci-Fi"

console.log(genre.split(','));