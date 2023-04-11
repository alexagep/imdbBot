const { Genre } = require("../models/genres");

async function getGenre(clause) {
  const row = await Genre.findOne({ where: clause });
  return row;
}


module.exports = {
  getGenre,
};
