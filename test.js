const db = require("./db/models/index");
const Movie = db.Movie;
const { Op } = require("sequelize");

async function getAllMovie() {
  const MovieList = await Movie.findAll();
  console.log(MovieList.length);
}
getAllMovie();

const searchQuery = "Slave";
Movie.findAll({
  where: {
    name: { [Op.like]: `%${searchQuery}%` },
  },
})
  .then((movies) => {
    movies.forEach((movie) => {
      console.log(movie.dataValues);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
