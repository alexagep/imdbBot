const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Use environment variables directly instead of envConfig object
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

module.exports = {
  dropDatabase: async () => {
    const dropDb = `DROP DATABASE ${process.env.DATABASE}`;
    const dropRole = `DROP ROLE ${process.env.USERNAME}`;

    try {
      const existDb = await sequelize.query(
        `SELECT 1 FROM pg_catalog.pg_database WHERE datname = '${process.env.DATABASE}';`,
        { type: QueryTypes.SELECT }
      );

      const existRole = await sequelize.query(
        `SELECT 1 FROM pg_roles WHERE rolname = '${process.env.USERNAME}';`,
        { type: QueryTypes.SELECT }
      );

      existDb.length && (await sequelize.query(dropDb));
      existRole.length && (await sequelize.query(dropRole));

      await sequelize.close();

      process.exit(0);
    } catch (err) {
      console.log("ERROR IN DROPPING DATABASE", err);
    }
  },
};
