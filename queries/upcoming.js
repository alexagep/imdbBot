const { Upcoming } = require("../models/upcoming");

async function getAllUpcoming() {
  const UpcomingList = await Upcoming.findAll();
  return UpcomingList;
}

async function updateUpcomingRow(data) {
  try {
    const result = await Upcoming.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// USAGE: createUpcoming({ data: { name: 'Example', value: 42 }, createdAt: new Date(), updatedAt: new Date() })
async function createUpcoming(data) {
  try {
    const Upcoming = await Upcoming.create({ data });
    console.log("New record created in Upcoming table");
    return Upcoming;
  } catch (error) {
    console.error("Error creating new record in Upcoming table:", error);
    throw error;
  }
}

module.exports = {
  getAllUpcoming,
  updateUpcomingRow,
  createUpcoming,
};
