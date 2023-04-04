const TelegramBot = require('node-telegram-bot-api');
const IMDb = require('imdb-api');

const bot = new TelegramBot('6038152144:AAGxxQljT6mp9NbuSUESQVbZsLk4MQ7aCNU', { polling: true });
const imdb = new IMDb({ apiKey: 'YOUR_IMDB_API_KEY_HERE' });
