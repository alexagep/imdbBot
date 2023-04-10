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
    const dropDb = `DROP DATABASE ${process.env.PG_DATABASE}`;
    const dropRole = `DROP ROLE ${process.env.PG_USER}`;

    try {
      const existDb = await sequelize.query(
        `SELECT 1 FROM pg_catalog.pg_database WHERE datname = '${process.env.PG_DATABASE}';`,
        { type: QueryTypes.SELECT }
      );

      const existRole = await sequelize.query(
        `SELECT 1 FROM pg_roles WHERE pg_roles.rolename = '${process.env.PG_USER}';`,
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
