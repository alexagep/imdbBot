import env from '../common/env';

const config = {
  development: {
    username: env('PG_USER'),
    password: env('PG_PASS'),
    database: env('PG_DATABASE'),
    host: env('PG_HOST'),
    dialect: env('PG_DIALECT'),
    logging: false,
  },
  test: {
    username: env('PG_USER'),
    password: env('PG_PASS'),
    database: env('PG_DATABASE'),
    host: env('PG_HOST'),
    dialect: env('PG_DIALECT'),
    logging: false,
  },
  production: {
    username: env('PG_USER'),
    password: env('PG_PASS'),
    database: env('PG_DATABASE'),
    host: env('PG_HOST'),
    dialect: env('PG_DIALECT'),
    logging: false,
  },
  timestamps: true,
};

export default config;
