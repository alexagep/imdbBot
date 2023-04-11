const { Genre } = require("../models/genres");

async function getAllGenre() {
  const GenreList = await Genre.findAll();
  return GenreList;
}

async function updateGenreRow(data) {
  try {
    const result = await Genre.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// USAGE: createGenre({ data: { name: 'Example', value: 42 }, createdAt: new Date(), updatedAt: new Date() })
async function createGenre(data) {
  try {
    const rows = await Genre.create({ data });
    console.log("New record created in Genre table");
    return rows;
  } catch (error) {
    console.error("Error creating new record in Genre table:", error.message);
    // throw error;
  }
}

module.exports = {
  getAllGenre,
  updateGenreRow,
  createGenre,
};
