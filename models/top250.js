const { Sequelize, DataTypes } = require("sequelize");
const cron = require("node-cron");
const fetch = require('node-fetch');

// Create a Sequelize instance
const sequelize = new Sequelize("imdbrate", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

// Define the Top250 model
const Top250 = sequelize.define("Top250", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync();

// Define a function to update the Top250 table
async function updateTop250(data) {
  // Your query to update the Top250 table goes here
  // For example:
  await Top250.update({ data }, { where: { id: 1 } });
}

// Define a separate async function to make the API request and pass the data to the updateTop250 function
async function fetchAndProcessData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    await updateTop250(data);
  } catch (error) {
    console.error(error);
  }
}

// // Schedule the updateTop250 function to run each day at 4 AM
// cron.schedule("0 4 * * *", () => {
//   fetchAndProcessData();
// });

module.exports = {updateTop250, fetchAndProcessData};

/*
const { Sequelize, DataTypes } = require("sequelize");

// Define the connection details for your database
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

// Define the first table
const Table1 = sequelize.define("Table1", {
  // define the columns for this table
});

// Define the second table
const Table2 = sequelize.define("Table2", {
  // define the columns for this table
});

// Define the third table
const Table3 = sequelize.define("Table3", {
  // define the columns for this table
});

// Define the fourth table
const Table4 = sequelize.define("Table4", {
  // define the columns for this table
});

// Define the fifth table
const Table5 = sequelize.define("Table5", {
  // define the columns for this table
});
*/
