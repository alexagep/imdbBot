// const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fetch = require("node-fetch");
const stringSimilarity = require("string-similarity");

require("dotenv").config();

const TELEGRAM_API_KEY = process.env.telegramAPIKEY;
const OMDB_API_KEY = process.env.omdbAPIKEY;
const IMDB_API_KEY = process.env.imdbAPIKEY;

const IMDB_TOP_250_URL = `https://imdb-api.com/en/API/Top250Movies/${IMDB_API_KEY}`;
const IMDB_ARTIST_NAME = `https://imdb-api.com/en/api/SearchName/${IMDB_API_KEY}`;
const IMDB_BOX_OFFICE = `https://imdb-api.com/en/api/BoxOffice/${IMDB_API_KEY}`;
const IMDB_BOX_OFFICE_ALLTIME = `https://imdb-api.com/en/API/BoxOfficeAllTime/${IMDB_API_KEY}`;
const IMDB_USER_RATINGS = `https://imdb-api.com/en/API/UserRatings/${IMDB_API_KEY}`;
const IMDB_COMING_SOON = `https://imdb-api.com/en/api/ComingSoon/${IMDB_API_KEY}`;

// const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });

async function getData () {
    const data = await fetch(``)
}


// const staticKeyboard = {
//   reply_markup: JSON.stringify({
//     keyboard: [
//       ["🎥 Search Movie", "🔝 Top250"],
//       ["🎭 Coming Soon", "💰 Box Office"],
//       ["💰📈 Box Office AllTime"],
//     ],
//     one_time_keyboard: false,
//     resize_keyboard: true,
//   }),
// };

// bot.onText(/\/start/, (msg) => {
//   try {
//     console.log("****************");
//     const chatId = msg.chat.id;
//     const welcomeMessage =
//       "Welcome to the IMDB Bot! Send me the title of a movie, and I will return its IMDb rating. Select an option:";
//     bot.sendMessage(chatId, welcomeMessage, staticKeyboard);
//   } catch (error) {
//     console.log(error);
//   }
// });

// bot.on("message", (msg) => {
//   console.log("Received message:", msg.text);
// });

// console.log("Movie Rating Bot is running...");
