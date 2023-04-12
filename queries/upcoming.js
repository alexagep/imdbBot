const { db } = require("../db/models/index");

const Upcoming = db.Upcoming

async function getAllUpcoming() {
  const UpcomingList = await Upcoming.findAll();
  return UpcomingList;
}

async function updateUpcomingRow(data) {
  try {
    const result = await Upcoming.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// USAGE: createUpcoming({ data: { name: 'Example', value: 42 }, createdAt: new Date(), updatedAt: new Date() })
async function createUpcoming(data) {
  try {
    const row = await Upcoming.create({ data });
    console.log("New record created in Upcoming table");
    return row;
  } catch (error) {
    console.error("Error creating new record in Upcoming table:", error.message);
    // throw error;
  }
}

module.exports = {
  getAllUpcoming,
  updateUpcomingRow,
  createUpcoming,
};
