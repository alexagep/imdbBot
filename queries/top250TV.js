const { Top250TV } = require("../models/top250TV");

async function getAllTop250TV() {
  const Top250TVList = await Top250TV.findAll();
  return Top250TVList;
}

async function updateTop250TVRow(data) {
  try {
    const result = await Top250TV.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// USAGE: createTop250TV({ data: { name: 'Example', value: 42 }, updatedAt: new Date() })
async function createTop250TV(data) {
  try {
    // console.log(data.length);
    const rows = await Top250TV.create({ data });
    console.log("New record created in Top250TV table");
    return rows;
  } catch (error) {
    console.error("Error creating new record in Top250TV table:", error);
    throw error;
  }
}

module.exports = {
  getAllTop250TV,
  updateTop250TVRow,
  createTop250TV,
};
