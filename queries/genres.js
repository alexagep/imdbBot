const { Genre } = require("../models/genres");

async function getAllGenre(clause) {
  const row = await Genre.findOne({ where: clause });
  return row;
}


module.exports = {
  getAllGenre,
  updateGenreRow,
  createGenre,
};
