const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fetch = require("node-fetch");

require("dotenv").config();

const TELEGRAM_API_KEY = process.env.telegramAPIKEY;
const OMDB_API_KEY = process.env.omdbAPIKEY;
const IMDB_API_KEY = process.env.imdbAPIKEY;

const IMDB_TOP_250_URL = `https://imdb-api.com/en/API/Top250Movies/k_t8o2kalg`;

const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });

const staticKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [["Search", "Top250"]],
    one_time_keyboard: false,
    resize_keyboard: true,
  }),
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage =
    "Welcome to the IMDB Bot! Send me the title of a movie, and I will return its IMDb rating. Select an option:";
  bot.sendMessage(chatId, welcomeMessage, staticKeyboard);
});

bot.onText(/search/, async (msg) => {
  const chatId = msg.chat.id;

  // Perform the search functionality here

  bot.sendMessage(chatId, "Enter the movie title you want to search:");
});

bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;

  const menuOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Top 50 Movies", callback_data: `next_${0}` },
          { text: "Search Movie", callback_data: "search" },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, "Menu:", menuOptions);
});

bot.onText(/Top250/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch(IMDB_TOP_250_URL);
    const data = await response.json();
    const topMovies = data.items
      .slice(0, 50)
      .map((item, index) => `${index + 1}. ${item.title}`)
      .join("\n");

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Next",
              callback_data: `next_${50}`,
            },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, `IMDb Top 50 Movies:\n\n${topMovies}`, opts);
  } catch (error) {
    console.error("Error fetching top 250 movies:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the top 250 movies. Please try again later."
    );
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const movieTitle = msg.text;

  if (!msg.text || msg.text.startsWith("/")) return;

  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: OMDB_API_KEY,
        t: movieTitle,
      },
    });

    const movie = response.data;
    if (movie.Response === "True") {
      const imdbUrl = `https://www.imdb.com/title/${movie.imdbID}`;
      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "More Info",
                url: imdbUrl,
              },
            ],
          ],
        },
      };
      bot.sendMessage(
        chatId,
        `🎬 ${movie.Title} (${movie.Year})\n🌟 IMDb Rating: ${movie.imdbRating}`,
        keyboard
      );
    } else {
      bot.sendMessage(
        chatId,
        "Sorry, I couldn't find that movie. Please try another title."
      );
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the movie rating. Please try again later."
    );
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;

  const match = callbackQuery.data.match(/^next_(\d+)$/);
  if (match) {
    const startIndex = parseInt(match[1], 10);
    const endIndex = startIndex + 50;

    try {
      const response = await fetch(IMDB_TOP_250_URL);
      const data = await response.json();
      const topMovies = data.items
        .slice(startIndex, endIndex)
        .map((item, index) => `${startIndex + index + 1}. ${item.title}`)
        .join("\n");

      const opts = {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [],
        },
      };

      if (endIndex < data.items.length) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Next",
            callback_data: `next_${endIndex}`,
          },
        ]);
      }

      bot.editMessageText(
        `IMDb Top ${startIndex + 1}-${endIndex} Movies:\n\n${topMovies}`,
        opts
      );
    } catch (error) {
      console.error("Error fetching top 250 movies:", error);
      bot.sendMessage(
        chatId,
        "An error occurred while fetching the top 250 movies. Please try again later."
      );
    }
  } else if (callbackQuery.data === "search") {
    bot.sendMessage(
      chatId,
      "Please enter the title of the movie you want to search for:"
    );
  }
});

console.log("Movie Rating Bot is running...");
