const env = require('../common/env');

const config = {
  development: {
    username: env('PG_USER'),
    password: env('PG_PASS'),
    database: env('PG_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_DIALECT'),
    logging: false,
  },
  test: {
    username: env('PG_USER'),
    password: env('PG_PASS'),
    database: env('PG_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_DIALECT'),
    logging: false,
  },
  production: {
    username: env('PG_USER'),
    password: env('PG_PASS'),
    database: env('PG_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_DIALECT'),
    logging: false,
  },
  timestamps: true,
};

module.exports = config;
