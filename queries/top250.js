const Top250_DB = require("../models/top250");
// const Top250 = db.Top250

async function getAllTop250() {
  const top250List = await Top250_DB.findAll();
  return top250List;
}

async function updateTop250Row(data) {
  try {
    const result = await Top250_DB.update({ data }, { where: { id: 1 } });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}


// USAGE: createTop250({ data: { name: 'Example', value: 42 }, updatedAt: new Date() })
async function createTop250(data) {
  try {
    const top250 = await Top250_DB.create(data);
    console.log("New record created in Top250 table:", top250.toJSON());
    return top250;
  } catch (error) {
    console.error("Error creating new record in Top250 table:", error);
    throw error;
  }
}

module.exports = {
  getAllTop250,
  updateTop250Row,
  createTop250,
};
