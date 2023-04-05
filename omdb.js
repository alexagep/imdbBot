const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fetch = require("node-fetch");

require("dotenv").config();

const TELEGRAM_API_KEY = process.env.telegramAPIKEY;
const OMDB_API_KEY = process.env.omdbAPIKEY;
const IMDB_API_KEY = process.env.imdbAPIKEY;

const IMDB_TOP_250_URL = `https://imdb-api.com/en/API/Top250Movies/${IMDB_API_KEY}`;
const IMDB_ARTIST_NAME = `https://imdb-api.com/en/api/SearchName/${IMDB_API_KEY}`;
const IMDB_BOX_OFFICE = `https://imdb-api.com/en/api/BoxOffice/${IMDB_API_KEY}`;
const IMDB_BOX_OFFICE_ALLTIME = `https://imdb-api.com/en/API/BoxOfficeAllTime/${IMDB_API_KEY}`;

const IMDB_COMING_SOON = `https://imdb-api.com/en/api/ComingSoon/${IMDB_API_KEY}`;

const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });

const staticKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [
      ["🎥 Search Movie", "🔝 Top250"],
      ["🎭 Coming Soon", "💰 Box Office"],
      ["💰📈 BoxOffice AllTime"],
    ],
    one_time_keyboard: false,
    resize_keyboard: true,
  }),
};

bot.onText(/\/start/, (msg) => {
  console.log("****************");
  const chatId = msg.chat.id;
  const welcomeMessage =
    "Welcome to the IMDB Bot! Send me the title of a movie, and I will return its IMDb rating. Select an option:";
  bot.sendMessage(chatId, welcomeMessage, staticKeyboard);
});

bot.onText(/\/search/, async (msg) => {
  const chatId = msg.chat.id;

  // Perform the search functionality here

  bot.sendMessage(chatId, "Enter the movie title you want to search:");
});

bot.onText(/Search Movie/, async (msg) => {
  const chatId = msg.chat.id;

  // Perform the search functionality here

  bot.sendMessage(chatId, "Enter the movie title you want to search:");
});

bot.onText(/Coming Soon/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch(IMDB_COMING_SOON);
    const data = await response.json();
    // console.log(data);
    const movies = data.items
      .slice(0, 10)
      .map(
        (item, index) =>
          `${index + 1}. ${item.title}\n\nrelease: ${
            item.releaseState
          }\ngenres: ${item.genres}\nstars: ${item.stars}`
      )
      .join("\n\n");

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Next",
              callback_data: `next_movies_${10}`,
            },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, `Coming Soon:\n\n${movies}`, opts);
  } catch (error) {
    console.error("Error fetching the box office:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the box office. Please try again later."
    );
  }
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
            // {
            //   text: "Previous",
            //   callback_data: `previous_${50}`,
            // },
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

bot.onText(/Box Office/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch(IMDB_BOX_OFFICE);
    const data = await response.json();
    console.log(data);
    const movies = data.items
      .map((movie, index) => {
        return `${index + 1}. ${movie.title}\n\nweekend: ${
          movie.weekend
        }\ngross: ${movie.gross}\nweeks: ${movie.weeks}`;
      })
      .join("\n\n");

    bot.sendMessage(chatId, `Box Office:\n\n${movies}`);
  } catch (error) {
    console.error("Error fetching the box office:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the box office. Please try again later."
    );
  }
});

//box office allTime
bot.onText(/BoxOffice/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch(IMDB_BOX_OFFICE_ALLTIME);
    const data = await response.json();
    console.log(data);
    const movies = data.items
      .slice(0, 25)
      .map((movie, index) => {
        return `${index + 1}. ${movie.title}\n\ngross: ${
          movie.worldwideLifetimeGross
        }\nyear: ${movie.year}`;
      })
      .join("\n\n");

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Next",
              callback_data: `next_allTime_movies_${10}`,
            },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, `Box Office allTime:\n\n${movies}`, opts);
  } catch (error) {
    console.error("Error fetching the box office allTime:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the box office allTime. Please try again later."
    );
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const movieTitle = msg.text;

  console.log(movieTitle);
  if (
    !msg.text ||
    msg.text.startsWith("/") ||
    msg.text.startsWith("Search Movie") ||
    msg.text.startsWith("Coming Soon") ||
    msg.text.startsWith("Top250") ||
    msg.text.startsWith("🎥") ||
    msg.text.startsWith("🔝") ||
    msg.text.startsWith("🎭") ||
    msg.text.startsWith("💰")
  )
    return;

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
  // const previousMatch = callbackQuery.data.match(/^previous_(\d+)$/);
  const matchCS = callbackQuery.data.match(/^next_movies_(\d+)$/);
  const nextAllTime = callbackQuery.data.match(/^next_allTime_movies_(\d+)$/);

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
  } else if (matchCS) {
    const startIndex = parseInt(matchCS[1], 10);
    const endIndex = startIndex + 10;

    try {
      const response = await fetch(IMDB_COMING_SOON);
      const data = await response.json();

      const movies = data.items
        .slice(startIndex, endIndex)
        .map(
          (item, index) =>
            `${startIndex + index + 1}. ${item.title}\n\nrelease: ${
              item.releaseState
            }\ngenres: ${item.genres}\nstars: ${item.stars}`
        )
        .join("\n\n");

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
            callback_data: `next_movies_${endIndex}`,
          },
        ]);
      }

      bot.editMessageText(`Coming Soon:\n\n${movies}`, opts);
    } catch (error) {
      console.error("Error fetching coming soon movies:", error);
      bot.sendMessage(
        chatId,
        "An error occurred while fetching the coming soon movies. Please try again later."
      );
    }
  } else if (callbackQuery.data === "search") {
    bot.sendMessage(
      chatId,
      "Please enter the title of the movie you want to search for:"
    );
  } else if (nextAllTime) {
    const startIndex = parseInt(nextAllTime[1], 10);
    const endIndex = startIndex + 25;

    try {
      const response = await fetch(IMDB_BOX_OFFICE_ALLTIME);
      const data = await response.json();
      const topMovies = data.items
        .slice(startIndex, endIndex)
        .map(
          (item, index) =>
            `${startIndex + index + 1}. ${item.title}\n\ngross: ${
              item.worldwideLifetimeGross
            }\nyear: ${item.year}`
        )
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
            callback_data: `next_allTime_movies_${endIndex}`,
          },
        ]);
      }

      bot.editMessageText(
        `IMDb Top ${startIndex + 1}-${endIndex} Movies:\n\n${topMovies}`,
        opts
      );
    } catch (error) {
      console.error("Error fetching box office allTime:", error);
      bot.sendMessage(
        chatId,
        "An error occurred while fetching the box office allTime. Please try again later."
      );
    }
  }
  // else if (previousMatch) {
  //   const startIndex = parseInt(previousMatch[1], 10);
  //   const endIndex = startIndex - 50;

  //   try {
  //     const response = await fetch(IMDB_TOP_250_URL);
  //     const data = await response.json();
  //     const topMovies = data.items
  //       .slice(startIndex, endIndex)
  //       .map((item, index) => `${startIndex + index + 1}. ${item.title}`)
  //       .join("\n");

  //     const opts = {
  //       chat_id: chatId,
  //       message_id: messageId,
  //       reply_markup: {
  //         inline_keyboard: [],
  //       },
  //     };

  //     if (endIndex < data.items.length) {
  //       opts.reply_markup.inline_keyboard.push([
  //         {
  //           text: "Next",
  //           callback_data: `next_${endIndex}`,
  //         },
  //         {
  //           text: "Previous",
  //           callback_data: `prev_${endIndex}`,
  //         }
  //       ]);
  //     }

  //     bot.editMessageText(
  //       `IMDb Top ${startIndex + 1}-${endIndex} Movies:\n\n${topMovies}`,
  //       opts
  //     );
  //   } catch (error) {
  //     console.error("Error fetching top 250 movies:", error);
  //     bot.sendMessage(
  //       chatId,
  //       "An error occurred while fetching the top 250 movies. Please try again later."
  //     );
  //   }
  // }
});

console.log("Movie Rating Bot is running...");
