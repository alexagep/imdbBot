const { Sequelize, DataTypes } = require("sequelize");
const cron = require("node-cron");

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
});

// Sync the model with the database
sequelize.sync();

// Define a function to update the Top250 table
async function updateTop250(data) {
  // Your query to update the Top250 table goes here
  // For example:
  await Top250.update({ data }, { where: { id: 1 } });
}

// Schedule the updateTop250 function to run each day at 4 AM
cron.schedule("0 4 * * *", () => {
  updateTop250(/* data */);
});

module.exports = updateTop250;
