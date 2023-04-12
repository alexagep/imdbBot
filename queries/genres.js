const { db } = require("../db/models/index");

const Genre = db.Genre

async function getGenre(clause) {
  const row = await Genre.findOne({ where: clause });
  return row;
}


module.exports = {
  getGenre,
};
