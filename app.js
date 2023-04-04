const TelegramBot = require("node-telegram-bot-api");
const IMDb = require("imdb-api");

const bot = new TelegramBot("6038152144:AAGxxQljT6mp9NbuSUESQVbZsLk4MQ7aCNU", {
  polling: true,
});
const imdb = new IMDb({ apiKey: "YOUR_IMDB_API_KEY_HERE" });

bot.onText(/\/movie (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const movieTitle = match[1];

  try {
    const movie = await imdb.get({ name: movieTitle });
    const rating = movie.rating;

    bot.sendMessage(chatId, `${movieTitle} has a rating of ${rating} on IMDb.`);
  } catch (err) {
    bot.sendMessage(
      chatId,
      `Sorry, I couldn't find a movie called "${movieTitle}" on IMDb.`
    );
  }
});


bot.startPolling();
