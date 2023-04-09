const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'imdbrate',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  dialect: 'postgres',
});


client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.stack);
  } else {
    console.log('Connected to PostgreSQL.');
  }
});

client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER
  );
`);



process.on('SIGINT', () => {
  client.end(() => {
    console.log('Disconnected from PostgreSQL.');
    process.exit(0);
  });
});