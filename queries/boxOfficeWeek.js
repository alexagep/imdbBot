const db = require("../db/models/index");

const BoxOfficeWeek = db.BoxOfficeWeek

async function getAllBoxOfficeWeek() {
  const BoxOfficeWeekList = await BoxOfficeWeek.findAll();
  return BoxOfficeWeekList;
}

async function updateBoxOfficeWeekRow(data) {
  try {
    const result = await BoxOfficeWeek.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// USAGE: createBoxOfficeWeek({ data: { name: 'Example', value: 42 }, createdAt: new Date(), updatedAt: new Date() })
async function createBoxOfficeWeek(data) {
  try {
    const row = await BoxOfficeWeek.create({ data });
    console.log("New record created in BoxOfficeWeek table");
    return row;
  } catch (error) {
    console.error("Error creating new record in BoxOfficeWeek table:", error.message);
    // throw error;
  }
}

module.exports = {
  getAllBoxOfficeWeek,
  updateBoxOfficeWeekRow,
  createBoxOfficeWeek,
};
