const { BoxOfficeAllTime } = require("../models/boxOfficeAll");

async function getAllBoxOfficeAllTime() {
  const BoxOfficeAllTimeList = await BoxOfficeAllTime.findAll();
  return BoxOfficeAllTimeList;
}

async function updateBoxOfficeAllTimeRow(data) {
  try {
    const result = await BoxOfficeAllTime.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// USAGE: createBoxOfficeAllTime({ data: { name: 'Example', value: 42 }, createdAt: new Date(), updatedAt: new Date() })
async function createBoxOfficeAllTime(data) {
  try {
    const row = await BoxOfficeAllTime.create({ data });
    console.log("New record created in BoxOfficeAllTime table");
    return row;
  } catch (error) {
    console.error("Error creating new record in BoxOfficeAllTime table:", error.message);
    // throw error;
  }
}

module.exports = {
  getAllBoxOfficeAllTime,
  updateBoxOfficeAllTimeRow,
  createBoxOfficeAllTime,
};
