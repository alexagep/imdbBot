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
  initDatabase: async () => {
    const createDb = `CREATE DATABASE ${process.env.DATABASE}`,
      createRole = `CREATE ROLE ${process.env.USERNAME} WITH LOGIN PASSWORD '${process.env.PASSWORD}'`,
      grantRoleAccess = `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${process.env.USERNAME};`,
      grantAccessToCopy = `GRANT pg_write_server_files TO ${process.env.USERNAME}`;

    try {
      const existDb = await sequelize.query(
          `SELECT 1 FROM pg_catalog.pg_database WHERE datname = '${process.env.DATABASE}';`,
          { type: QueryTypes.SELECT }
        ),
        existRole = await sequelize.query(
          `SELECT 1 FROM pg_roles WHERE rolname = '${process.env.USERNAME}';`,
          { type: QueryTypes.SELECT }
        );

      !existDb.length && (await sequelize.query(createDb));

      !existRole.length &&
        (await sequelize.query(createRole)) &&
        (await sequelize.query(grantRoleAccess)) &&
        (await sequelize.query(grantAccessToCopy));

      await sequelize.close();

      process.exit(0);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("ERROR IN INITIALIZING DATABASE", err);
    }
  },
};
