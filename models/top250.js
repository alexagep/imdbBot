// const { Sequelize, DataTypes } = require("sequelize");
// const cron = require("node-cron");
// const fetch = require('node-fetch');

// Create a Sequelize instance
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Top250 extends Model {
    static associate(models) {}
  }

  Top250.init(
    {
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
    }, // <-- add a closing brace here
    {
      sequelize,
      paranoid: false,
      modelName: "Top250",
    }
  );
  return Top250;
};

// Sync the model with the database
// sequelize.sync();

// Define a function to update the Top250 table
// async function updateTop250(data) {
//   // Your query to update the Top250 table goes here
//   // For example:
//   await Top250.update({ data }, { where: { id: 1 } });
// }

// Define a separate async function to make the API request and pass the data to the updateTop250 function
// async function fetchAndProcessData(url) {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     await updateTop250(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Schedule the updateTop250 function to run each day at 4 AM
// cron.schedule("0 4 * * *", () => {
//   fetchAndProcessData();
// });

// module.exports = {updateTop250, fetchAndProcessData};

/*
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Top250 extends Model {
    static associate(models) {}
  }

  Top250.init(
    {
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
    }, // <-- add a closing brace here
    {
      sequelize,
      paranoid: false,
      modelName: 'Top250',
    }
  )
  return Top250
}*/
