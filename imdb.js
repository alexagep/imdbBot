const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
const stringSimilarity = require("string-similarity");
const sharp = require("sharp");
const { updateTop250Row, getAllTop250 } = require("./queries/top250");
const { updateUpcomingRow, getAllUpcoming } = require("./queries/upcoming");
const axios = require("axios");
const {
  updateBoxOfficeAllTimeRow,
  getAllBoxOfficeAllTime,
} = require("./queries/boxOfficeAll");

const {
  updateBoxOfficeWeekRow,
  getAllBoxOfficeWeek,
} = require("./queries/boxOfficeWeek");

const cron = require("node-cron");
const { getAllTop250TV, updateTop250TVRow } = require("./queries/top250TV");
const {
  getAllMovieGenre,
  createMovieGenre,
  getAllSeries,
} = require("./queries/movieGenre");
const { findMoviesBySearchQuery } = require("./queries/movies");
const {
  getAllRating,
  createRating,
  createMovieRating,
  updateRatingRow,
} = require("./queries/ratings");
const { getAllUserRating, createUserRating } = require("./queries/userRatings");
const ytdl = require("ytdl-core");
const { createTrailer } = require("./queries/trailers");

require("dotenv").config();

const TELEGRAM_API_KEY = process.env.telegramAPIKEY;
const OMDB_API_KEY = process.env.omdbAPIKEY;
const IMDB_API_KEY = process.env.imdbAPIKEY2;

const IMDB_TOP_250_URL = `https://imdb-api.com/en/API/Top250Movies/${IMDB_API_KEY}`;
const IMDB_BOX_OFFICE = `https://imdb-api.com/en/api/BoxOffice/${IMDB_API_KEY}`;
const IMDB_BOX_OFFICE_ALLTIME = `https://imdb-api.com/en/API/BoxOfficeAllTime/${IMDB_API_KEY}`;
const IMDB_USER_RATINGS = `https://imdb-api.com/en/API/UserRatings/${IMDB_API_KEY}`;
const IMDB_COMING_SOON = `https://imdb-api.com/en/api/ComingSoon/${IMDB_API_KEY}`;
const IMDB_TOP250_TV = `https://imdb-api.com/en/API/Top250TVs/${IMDB_API_KEY}`;

const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });

const genres = [
  "comedy",
  "sci-fi",
  "romance",
  "thriller",
  "horror",
  "action",
  "drama",
  "fantasy",
  "adventure",
  "animation",
  "crime",
  "documentary",
  "family",
  "history",
  "music",
  "mystery",
  "sport",
  "war",
  "western",
];

// Schedule the updateTop250TV function to run each day at 00:30 AM
cron.schedule("30 0 * * *", () => {
  fetchAndProcessData(IMDB_TOP250_TV, "tvtop250");
});

// Schedule the updateTop250 function to run each day at 1 AM
cron.schedule("0 1 * * *", () => {
  fetchAndProcessData(IMDB_TOP_250_URL, "top250");
});

// Schedule the updateUpcomingRow function to run each day at 1:30 AM
cron.schedule("30 1 * * *", () => {
  fetchAndProcessData(IMDB_COMING_SOON, "upcoming");
});

// Schedule the updateBoxOfficeWeekRow function to run each day at 2 AM
cron.schedule("0 2 * * *", () => {
  fetchAndProcessData(IMDB_BOX_OFFICE, "boxWeek");
});

// Schedule the updateBoxOfficeAllTimeRow function to run each day at 2:30 AM
cron.schedule("30 2 * * *", () => {
  fetchAndProcessData(IMDB_BOX_OFFICE_ALLTIME, "boxAll");
});

// Schedule the cronjob to run every Friday at 03:00 AM
// cron.schedule("0 3 * * 5", async () => {
//   console.log("Running generateRecommendation cronjob...");
//   await generateRecommendation();
// });

const staticKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [
      ["🎥 Search Movie", "🔝 Top250"],
      ["🎭 Coming Soon", "💰 Box Office"],
      ["📺 Recommend Series"],
      ["🍿🤖 Recommend Movie"],
    ],
    one_time_keyboard: false,
    resize_keyboard: true,
  }),
};

// Define the available box office options
const boxOfficeOptions = [
  [{ text: "💰 Box Office Weekend", callback_data: "box_office_weekend" }],
  [{ text: "💰📈 Box Office AllTime", callback_data: "box_office_all_time" }],
];

// Define the available box office options
const top250Options = [
  [{ text: "🔝 Top250 Movies", callback_data: "top250_movies" }],
  [{ text: "🔝 Top250 TV Series", callback_data: "top250_TV" }],
];

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

let upcomingList = null;
bot.onText(/Coming Soon/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const moviesInDb = await getAllUpcoming();

    if (moviesInDb[0].dataValues.data.items.length > 0) {
      upcomingList = moviesInDb[0].dataValues.data.items;
    }

    // else {
    //   const response = await fetch(IMDB_COMING_SOON);
    //   const data = await response.json();

    //   upcomingList = data.items;
    // }

    //create a new coming soon list
    // await createUpcoming(data.items)

    const movies = upcomingList
      .slice(0, 10)
      .map(
        (item, index) =>
          `${index + 1}. ${item.title}\n\n🗓️ Release Date: ${
            item.releaseState
          }\n🎭 Genres: ${item.genres}\n🌟 Stars: ${item.stars}`
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
    console.error("Error fetching the Coming Soon:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the Coming Soon. Please try again later."
    );
  }
});

bot.onText(/Recommend Movie/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Comedy",
              callback_data: `comedy`,
            },
          ],
          [
            {
              text: "Sci-fi",
              callback_data: `Sci-fi`,
            },
          ],
          [
            {
              text: "Romance",
              callback_data: `romance`,
            },
          ],
          [
            {
              text: "Thriller",
              callback_data: `thriller`,
            },
          ],
          [
            {
              text: "Horror",
              callback_data: `horror`,
            },
          ],
          [
            {
              text: "Action",
              callback_data: `action`,
            },
          ],
          [
            {
              text: "Animation",
              callback_data: "animation",
            },
          ],
          [
            {
              text: "Adventure",
              callback_data: "adventure",
            },
          ],
          [
            {
              text: "Drama",
              callback_data: "drama",
            },
          ],
          [
            {
              text: "Family",
              callback_data: "family",
            },
          ],
          [
            {
              text: "Crime",
              callback_data: "crime",
            },
          ],
          [
            {
              text: "Documentary",
              callback_data: "documentary",
            },
          ],
          [
            {
              text: "Mystery",
              callback_data: "mystery",
            },
          ],
          [
            {
              text: "Western",
              callback_data: "western",
            },
          ],
          [
            {
              text: "War",
              callback_data: "war",
            },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, `Select A Genre You Want To See:\n\n`, opts);
  } catch (error) {
    console.error("Error fetching the Coming Soon:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the Coming Soon. Please try again later."
    );
  }
});

let tvRecomFlag = null;
bot.onText(/📺 Recommend Series/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Comedy",
              callback_data: `comedy`,
            },
          ],
          [
            {
              text: "Sci-fi",
              callback_data: `Sci-fi`,
            },
          ],
          [
            {
              text: "Romance",
              callback_data: `romance`,
            },
          ],
          [
            {
              text: "Thriller",
              callback_data: `thriller`,
            },
          ],
          [
            {
              text: "Horror",
              callback_data: `horror`,
            },
          ],
          [
            {
              text: "Action",
              callback_data: `action`,
            },
          ],
          [
            {
              text: "Animation",
              callback_data: "animation",
            },
          ],
          [
            {
              text: "Adventure",
              callback_data: "adventure",
            },
          ],
          [
            {
              text: "Drama",
              callback_data: "drama",
            },
          ],
          [
            {
              text: "Family",
              callback_data: "family",
            },
          ],
          [
            {
              text: "Crime",
              callback_data: "crime",
            },
          ],
          [
            {
              text: "Documentary",
              callback_data: "documentary",
            },
          ],
          [
            {
              text: "Mystery",
              callback_data: "mystery",
            },
          ],
          [
            {
              text: "Western",
              callback_data: "western",
            },
          ],
          [
            {
              text: "War",
              callback_data: "war",
            },
          ],
        ],
      },
    };

    tvRecomFlag = true;

    bot.sendMessage(chatId, `Select A Genre You Want To See:\n\n`, opts);
  } catch (error) {
    console.error("Error fetching the Coming Soon:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the Coming Soon. Please try again later."
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

  // Send the available options to the user
  const opts = {
    reply_markup: {
      inline_keyboard: top250Options,
    },
  };
  bot.sendMessage(chatId, "Which information do you want to see?", opts);
});

// Handle the user's request to see box office information
bot.onText(/Box Office/, async (msg) => {
  const chatId = msg.chat.id;

  // Send the available options to the user
  const opts = {
    reply_markup: {
      inline_keyboard: boxOfficeOptions,
    },
  };
  bot.sendMessage(chatId, "Which information do you want to see?", opts);
});

let movie_ID = null;
let movieCollector = null;

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const movieTitle = msg.text;

  if (
    !msg.text ||
    msg.text.startsWith("/") ||
    msg.text.startsWith("Search Movie") ||
    msg.text.startsWith("Coming Soon") ||
    msg.text.startsWith("Top250") ||
    msg.text.startsWith("🎥") ||
    msg.text.startsWith("🔝") ||
    msg.text.startsWith("🎭") ||
    msg.text.startsWith("💰") ||
    msg.text.startsWith("🍿") ||
    msg.text.startsWith("📺")
  )
    return;

  try {
    const moviesInDb = await findMoviesBySearchQuery(movieTitle);

    if (moviesInDb.length > 0) {
      movieCollector = moviesInDb;

      const opts = creatingSearchedMoviesButton(moviesInDb, chatId);

      bot.sendMessage(chatId, `Select a movie:\n\n`, opts);
    } else {
      const response = await fetch(
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?title=${movieTitle}`
      );

      const data = await response.json();

      const movie = data.results;

      if (movie.length > 0) {
        const foundMovies = findSimilarityScores(movieTitle, movie);

        if (foundMovies.length > 0) {
          movieCollector = foundMovies;

          const opts = creatingSearchedMoviesFromApi(foundMovies, chatId);

          bot.sendMessage(chatId, `Select a movie:\n\n`, opts);
        } else {
          bot.sendMessage(
            chatId,
            "Sorry, I couldn't find that movie. Please try another title."
          );
        }
      } else {
        bot.sendMessage(
          chatId,
          "Sorry, I couldn't find that movie. Please try another title."
        );
      }
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the movie rating. Please try again later."
    );
  }
});

let genre = null;
let boxAllList = null;
let top250List = null;
let top250SeriesList = null;
let genreId = null;
let movieGenre = null;
let serieGenre = null;
let movieDbId = null;

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const match = callbackQuery.data.match(/^next_(\d+)$/);
  const matchSeries = callbackQuery.data.match(/^next_series_(\d+)$/);
  const matchCS = callbackQuery.data.match(/^next_movies_(\d+)$/);
  const nextAllTime = callbackQuery.data.match(/^next_allTime_movies_(\d+)$/);

  if (match) {
    const startIndex = parseInt(match[1], 10);
    const endIndex = startIndex + 25;

    try {
      const topMovies = top250List
        .slice(startIndex, endIndex)
        .map(
          (item, index) =>
            `${startIndex + index + 1}. ${item.fullTitle}\n⭐️ IMDb Rating: ${
              item.imDbRating
            }`
        )
        .join("\n\n");

      const opts = {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [],
        },
      };

      if (endIndex < top250List.length) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Next",
            callback_data: `next_${endIndex}`,
          },
        ]);
      }

      // add a "Back" button if there are previous movies to show
      if (startIndex > 0) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Back",
            callback_data: `next_${startIndex - 25}`,
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
  } else if (matchSeries) {
    const startIndex = parseInt(matchSeries[1], 10);
    const endIndex = startIndex + 25;

    try {
      const topSeries = top250SeriesList
        .slice(startIndex, endIndex)
        .map(
          (item, index) =>
            `${startIndex + index + 1}. ${item.fullTitle}\n⭐️ IMDb Rating: ${
              item.imDbRating
            }`
        )
        .join("\n\n");

      const opts = {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [],
        },
      };

      if (endIndex < top250SeriesList.length) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Next",
            callback_data: `next_series_${endIndex}`,
          },
        ]);
      }

      // add a "Back" button if there are previous movies to show
      if (startIndex > 0) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Back",
            callback_data: `next_series_${startIndex - 25}`,
          },
        ]);
      }

      bot.editMessageText(
        `IMDb Top ${startIndex + 1}-${endIndex} Series:\n\n${topSeries}`,
        opts
      );
    } catch (error) {
      console.error("Error fetching top 250 series:", error);
      bot.sendMessage(
        chatId,
        "An error occurred while fetching the top 250 series. Please try again later."
      );
    }
  } else if (matchCS) {
    const startIndex = parseInt(matchCS[1], 10);
    const endIndex = startIndex + 10;

    try {
      const movies = upcomingList
        .slice(startIndex, endIndex)
        .map(
          (item, index) =>
            `${startIndex + index + 1}. ${item.title}\n\n🗓️ Release Date: ${
              item.releaseState
            }\n🎭 Genres: ${item.genres}\n🌟 Stars: ${item.stars}`
        )
        .join("\n\n");

      const opts = {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [],
        },
      };

      // add a "Next" button if there are more movies to show
      if (endIndex < upcomingList.length) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Next",
            callback_data: `next_movies_${endIndex}`,
          },
        ]);
      }

      // add a "Back" button if there are previous movies to show
      if (startIndex > 0) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Back",
            callback_data: `next_movies_${startIndex - 10}`,
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
      const topMovies = boxAllList
        .slice(startIndex, endIndex)
        .map(
          (item, index) =>
            `${startIndex + index + 1}. ${item.title} (${
              item.year
            })\n\nGross: ${item.worldwideLifetimeGross}\nDomestic Gross: ${
              item.domesticLifetimeGross
            }`
        )
        .join("\n\n");

      const opts = {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [],
        },
      };

      if (endIndex < boxAllList.length) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Next",
            callback_data: `next_allTime_movies_${endIndex}`,
          },
        ]);
      }

      // add a "Back" button if there are previous movies to show
      if (startIndex > 0) {
        opts.reply_markup.inline_keyboard.push([
          {
            text: "Back",
            callback_data: `next_allTime_movies_${startIndex - 25}`,
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
  if (callbackQuery.data === "user_ratings") {
    // Send the user ratings data
    if (movie_ID !== null) {
      const UserRatingDb = await getAllUserRating(movie_ID);

      let UserRatings = null;
      // let urCollect_movieId = null;

      // console.log(UserRatingDb.UserRatings);
      if (UserRatingDb.UserRatings.length > 0) {
        UserRatings = UserRatingDb.UserRatings[0];
        // urCollect_movieId = UserRatingDb
      } else {
        const urResponse = await fetch(`${IMDB_USER_RATINGS}/${movie_ID}`);

        UserRatings = await urResponse.json();

        await createUserRating(UserRatings, UserRatingDb.id);
      }

      console.log(UserRatings);

      const totalVotes =
        parseInt(UserRatings.demographicAll.allAges?.votes).toLocaleString() ||
        null;
      const ratingUnder18 =
        UserRatings.demographicAll.agesUnder18?.rating || null;
      const votesUnder18 =
        parseInt(
          UserRatings.demographicAll.agesUnder18?.votes
        ).toLocaleString() || null;
      const rating18To29 =
        UserRatings.demographicAll.ages18To29?.rating || null;
      const votes18To29 =
        parseInt(
          UserRatings.demographicAll.ages18To29?.votes
        ).toLocaleString() || null;
      const rating30To44 =
        UserRatings.demographicAll.ages30To44?.rating || null;
      const votes30To44 =
        parseInt(
          UserRatings.demographicAll.ages30To44?.votes
        ).toLocaleString() || null;
      const ratingOver45 =
        UserRatings.demographicAll.agesOver45?.rating || null;
      const votesOver45 =
        parseInt(
          UserRatings.demographicAll.agesOver45?.votes
        ).toLocaleString() || null;
      const ratingMales = UserRatings.demographicMales.allAges?.rating;
      const votesMales =
        parseInt(
          UserRatings.demographicMales.allAges?.votes
        ).toLocaleString() || null;
      const ratingFemales =
        UserRatings.demographicFemales.allAges?.rating || null;
      const votesFemales =
        parseInt(
          UserRatings.demographicFemales.allAges.votes
        ).toLocaleString() || null;

      const message = `
      Total Votes: ${totalVotes}\n\nRatings by Age:\n🧒 Under 18: ${ratingUnder18} (${votesUnder18})\n👨🏻‍🎓 18-29: ${rating18To29} (${votes18To29})\n👨🏽‍💼 30-44: ${rating30To44} (${votes30To44})\n👴🏾 Over 45: ${ratingOver45} (${votesOver45})\n\nRatings by Gender:\n👨🏼 Males: ${ratingMales} (${votesMales})\n👩🏻 Females: ${ratingFemales} (${votesFemales})`;

      bot.sendMessage(chatId, message);
    }
  }

  // Initial callback query handling
  if (genres.includes(callbackQuery.data.toLowerCase())) {
    genre = callbackQuery.data.toLowerCase();

    genreId = genres.indexOf(genre) + 1; // Get the id of the chosen genre

    console.log(genre, genreId, "GENREID");

    if (tvRecomFlag) {
      serieGenre = await getAllSeries(genreId);

      console.log(serieGenre.length, "length of", genre, " series in DB");

      await generateRecommendationFromDB(serieGenre, chatId);
    } else {
      movieGenre = await getAllMovieGenre(genreId);

      console.log(movieGenre.length, "length of", genre, " movies in DB");

      await generateRecommendationFromDB(movieGenre, chatId);
    }

    await bot.deleteMessage(chatId, messageId);
  }

  // New recommendation callback query handling
  if (callbackQuery.data === "new_recommendation") {
    if (tvRecomFlag) {
      await generateRecommendationFromDB(serieGenre, chatId);
    } else {
      await generateRecommendationFromDB(movieGenre, chatId);
    }

    await bot.deleteMessage(chatId, messageId);
  }

  if (callbackQuery.data === "box_office_weekend") {
    const moviesInDb = await getAllBoxOfficeWeek();

    const movies = moviesInDb[0].dataValues.data.items
      .map((movie, index) => {
        return `${index + 1}. ${movie.title}\n\nWeekend: ${
          movie.weekend
        }\nGross: ${movie.gross}\nWeeks: ${movie.weeks}`;
      })
      .join("\n\n");

    bot.sendMessage(chatId, `🎬 Box Office Weekend:\n\n${movies}`);
  } else if (callbackQuery.data === "box_office_all_time") {
    const moviesInDb = await getAllBoxOfficeAllTime();

    const moviesItems = moviesInDb[0].dataValues.data.items;

    if (moviesItems.length > 0) {
      boxAllList = moviesItems;
    }

    // else {
    //   const response = await fetch(IMDB_BOX_OFFICE_ALLTIME);
    //   const data = await response.json();

    //   boxAllList = data.items
    // }

    //create a new coming soon list
    // await createBoxOfficeAllTime(data.items);

    const movies = boxAllList
      .slice(0, 25)
      .map((movie, index) => {
        return `${index + 1}. ${movie.title} (${movie.year})\n\nGross: ${
          movie.worldwideLifetimeGross
        }\nDomestic Gross: ${movie.domesticLifetimeGross}`;
      })
      .join("\n\n");

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Next",
              callback_data: `next_allTime_movies_${25}`,
            },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, `🎬 Box Office All-Time 🎥:\n\n${movies}`, opts);

    await bot.deleteMessage(chatId, messageId);
  }

  if (callbackQuery.data === "top250_movies") {
    try {
      const moviesInDb = await getAllTop250();

      const moviesItems = moviesInDb[0].dataValues.data.items;

      if (moviesItems.length > 0) {
        top250List = moviesItems;
      }

      // else {
      //   const response = await fetch(IMDB_TOP_250_URL);
      //   const data = await response.json();

      //   top250List = data.items
      // }

      //create a new list of top250 movies
      //await createTop250({ data: data.items, createdAt: new Date(), updatedAt: new Date() })

      const topMovies = top250List
        .slice(0, 25)
        .map(
          (item, index) =>
            `${index + 1}. ${item.fullTitle}\n⭐️ IMDb Rating: ${
              item.imDbRating
            }`
        )
        .join("\n\n");

      const opts = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Next",
                callback_data: `next_${25}`,
              },
            ],
          ],
        },
      };

      bot.sendMessage(chatId, `IMDb Top 25 Movies:\n\n${topMovies}`, opts);

      await bot.deleteMessage(chatId, messageId);
    } catch (error) {
      console.error("Error fetching top 250 movies:", error);
      bot.sendMessage(
        chatId,
        "An error occurred while fetching the top 250 movies. Please try again later."
      );
    }
  } else if (callbackQuery.data === "top250_TV") {
    try {
      const seriesInDb = await getAllTop250TV();

      const seriesItems = seriesInDb[0].dataValues.data.items;

      if (seriesItems.length > 0) {
        top250SeriesList = seriesItems;
      }

      // else {
      //   const response = await fetch(IMDB_TOP250_TV);
      //   const data = await response.json();

      //   top250List = data.items
      // }

      //create a new list of top250 movies
      //await createTop250({ data: data.items, createdAt: new Date(), updatedAt: new Date() })

      const topSeries = top250SeriesList
        .slice(0, 25)
        .map(
          (item, index) =>
            `${index + 1}. ${item.fullTitle}\n⭐️ IMDb Rating: ${
              item.imDbRating
            }`
        )
        .join("\n\n");

      const opts = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Next",
                callback_data: `next_series_${25}`,
              },
            ],
          ],
        },
      };

      bot.sendMessage(chatId, `IMDb Top 25 Series:\n\n${topSeries}`, opts);

      await bot.deleteMessage(chatId, messageId);
    } catch (error) {
      console.error("Error fetching top 250 Series:", error);
      bot.sendMessage(
        chatId,
        "An error occurred while fetching the top 250 Series. Please try again later."
      );
    }
  }

  if (callbackQuery.data.startsWith("show_movie_")) {
    const movieId = callbackQuery.data.split("_")[2];

    const movie = movieCollector.find((item) => {
      if (item.imdbId === movieId) {
        return item;
      }
    });

    const response = await fetch(movie.imageUrl);
    const buffer = await response.buffer();

    movieDbId = movie.id;

    const movies = await getAllRating(movie.id);

    const isTimePassed =
      movies.length > 0
        ? isDatePassedBy7Days(movies[0].dataValues.updatedAt)
        : true;

    let ratings = null;
    let rateMessage = null;

    if (isTimePassed) {
      const ratingsResp = await fetch(
        `https://imdb-api.com/en/API/Ratings/${IMDB_API_KEY}/${movieId}`
      );

      const ratings = await ratingsResp.json();

      rateMessage = ``;

      const imdbRate = `⭐️ IMDb Rating: ${parseFloat(ratings.imDb).toFixed(
        1
      )}\n`;
      const metacriticRate = `🌟 Metacritic Rating: ${ratings.metacritic}/100\n`;
      const rottenRate = `🍅 RottenTomatoes Rating: ${ratings.rottenTomatoes}/100`;

      if (ratings.imDb) {
        rateMessage += imdbRate;
      }
      if (ratings.metacritic) {
        rateMessage += metacriticRate;
      }
      if (ratings.rottenTomatoes) {
        rateMessage += rottenRate;
      }
      if (rateMessage === "") {
        rateMessage += `❌  No Rating`;
      }

      if (movies.length === 0) {
        await createRating(ratings, movie.id);
      } else if (isTimePassed) {
        await updateRatingRow(ratings, movie.id);
      }
    } else {
      ratings = movies[0];

      rateMessage = ``;

      const imdbRate = `⭐️ IMDb Rating: ${ratings.imdbRating}\n`;
      const metacriticRate = `🌟 Metacritic Rating: ${ratings.metacriticRating}/100\n`;
      const rottenRate = `🍅 RottenTomatoes Rating: ${ratings.rottenRating}/100`;

      if (ratings.imdbRating) {
        rateMessage += imdbRate;
      }
      if (ratings.metacriticRating) {
        rateMessage += metacriticRate;
      }
      if (ratings.rottenRating) {
        rateMessage += rottenRate;
      }
      if (rateMessage === "") {
        rateMessage += `❌  No Rating`;
      }
    }

    movie_ID = movieId;

    const resizedBuffer = await sharp(buffer)
      .resize({ width: 1280, height: 1024, fit: "inside" })
      .toBuffer();

    const message = `🎬 ${movie.name} ${movie.year}\n\n${rateMessage}\n\n⏱ Time: ${movie.runtime}\n🎭 Genres: ${movie.genres}\n🔞 Content Rating: ${movie.contentRating}\n`;

    const imdbUrl = `https://www.imdb.com/title/${movieId}`;
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "User Ratings",
              callback_data: "user_ratings",
            },
            { text: "Watch Trailer", callback_data: "trailer" },
          ],
          [{ text: "More Info", url: imdbUrl }],
        ],
      },
    };

    await bot.sendPhoto(chatId, resizedBuffer, {
      caption: message,
      reply_markup: opts.reply_markup,
    });

    await bot.deleteMessage(chatId, messageId);
  }

  if (callbackQuery.data.startsWith("show_api_movies_")) {
    const movieId = callbackQuery.data.split("_")[3];

    const movie = movieCollector.find((item) => {
      if (item.id === movieId) {
        return item;
      }
    });

    const response = await fetch(movie.image);
    const buffer = await response.buffer();

    movie_ID = movieId;

    const resizedBuffer = await sharp(buffer)
      .resize({ width: 1280, height: 1024, fit: "inside" })
      .toBuffer();

    const ratingsResp = await fetch(
      `https://imdb-api.com/en/API/Ratings/${IMDB_API_KEY}/${movieId}`
    );

    const ratings = await ratingsResp.json();

    let rateMessage = ``;

    const imdbRate = `⭐️ IMDb Rating: ${parseFloat(ratings.imDb).toFixed(
      1
    )}\n`;
    const metacriticRate = `🌟 Metacritic Rating: ${ratings.metacritic}/100\n`;
    const rottenRate = `🍅 RottenTomatoes Rating: ${ratings.rottenTomatoes}/100`;

    if (ratings.imDb) {
      rateMessage += imdbRate;
    }
    if (ratings.metacritic) {
      rateMessage += metacriticRate;
    }
    if (ratings.rottenTomatoes) {
      rateMessage += rottenRate;
    }
    if (rateMessage === "") {
      rateMessage += `❌  No Rating`;
    }

    const message = `🎬 ${movie.title} ${movie.description}\n\n${rateMessage}\n\n⏱ Time: ${movie.runtimeStr}\n🎭 Genres: ${movie.genres}\n🔞 Content Rating: ${movie.contentRating}\n`;

    const imdbUrl = `https://www.imdb.com/title/${movieId}`;
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "User Ratings",
              callback_data: "user_ratings",
            },
          ],
          [{ text: "More Info", url: imdbUrl }],
        ],
      },
    };

    await createMovieRating(movie, ratings, movie.genres);

    console.log("******%%%%%%%%%%%%*********");
    await bot.sendPhoto(chatId, resizedBuffer, {
      caption: message,
      reply_markup: opts.reply_markup,
    });

    await bot.deleteMessage(chatId, messageId);
  }

  if (callbackQuery.data === "trailer") {
    try {
      // Fetch the YouTube ID from the database (assuming it's stored as `youtubeId`)
      const movie = await getAllTrailer(movieDbId);
      let youtubeId = null;

      if (movie.length === 0) {
        const trailersResp = await fetch(
          `https://imdb-api.com/en/API/YouTubeTrailer/${IMDB_API_KEY}/${movie_ID}`
        );
  
        const trailer = await trailersResp.json();

        youtubeId = trailer.videoUrl;
        
        await createTrailer(youtubeId, movieDbId);
      } else {
        youtubeId = movie.videoUrl;
      }

      // Construct the video URL
      const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

      // Download the video and save it to a file
      const video = ytdl(videoUrl, { filter: "audioandvideo" });
      const filePath = `./downloads/video.mp4`;
      video.pipe(fs.createWriteStream(filePath)).on("finish", () => {
        // Send the video to the user
        bot.sendVideo(chatId, fs.createReadStream(filePath));
      });
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, "Error downloading the movie.");
    }
  }
});

function getRandomMovies(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];

  return randomMovie;
}


async function generateRecommendationFromDB(movieGenres, chatId) {
  try {
    let movie = getRandomMovies(movieGenres);

    movie = movie.dataValues.Movie.dataValues;

    const response = await fetch(movie.imageUrl);
    const buffer = await response.buffer();

    const resizedBuffer = await sharp(buffer)
      .resize({ width: 1280, height: 1024, fit: "inside" })
      .toBuffer();

    const message = `🎥 ${movie.name} ${
      movie.year
    }\n\n⭐️ IMDb rating: ${parseFloat(movie.rating).toFixed(1)} (${parseInt(
      movie.totalVotes
    ).toLocaleString()})\n⏱ Time: ${movie.runtime}\n🎭 Genres: ${
      movie.genres
    }\n🌟 Cast: ${movie.actors}\n🔞 Content Rating: ${
      movie.contentRating
    }\n\n📝 Plot: ${movie.plot}`;

    const imdbUrl = `https://www.imdb.com/title/${movie.imdbId}`;
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "New Recommendation",
              callback_data: "new_recommendation",
            },
          ],
          [{ text: "More Info", url: imdbUrl }],
        ],
      },
    };

    await bot.sendPhoto(chatId, resizedBuffer, {
      caption: message,
      reply_markup: opts.reply_markup,
    });
  } catch (error) {
    console.log("error in generateRecommendationFromDB", error.message);
  }
}

function creatingSearchedMoviesButton(movies) {
  const opts = {
    reply_markup: {
      inline_keyboard: [],
    },
  };
  movies.map((movie) => {
    opts.reply_markup.inline_keyboard.push([
      {
        text: `${movie.name} ${movie.year}`,
        callback_data: `show_movie_${movie.imdbId}`,
      },
    ]);
  });

  return opts;
}

function creatingSearchedMoviesFromApi(movies) {
  const opts = {
    reply_markup: {
      inline_keyboard: [],
    },
  };
  movies.map((movie) => {
    opts.reply_markup.inline_keyboard.push([
      {
        text: `${movie.title} ${movie.description}`,
        callback_data: `show_api_movies_${movie.id}`,
      },
    ]);
  });

  return opts;
}

async function fetchAndProcessData(url, entity) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    switch (entity) {
      case "top250":
        await updateTop250Row(data);
        break;
      case "upcoming":
        await updateUpcomingRow(data);
        break;
      case "boxWeek":
        await updateBoxOfficeWeekRow(data);
        break;
      case "boxAll":
        await updateBoxOfficeAllTimeRow(data);
        break;
      case "tvtop250":
        await updateTop250TVRow(data);
      default:
        console.log(`Invalid entity type: ${entity}`);
        break;
    }
  } catch (error) {
    console.error(error);
  }
}

function findSimilarityScores(movieTitle, items) {
  const movies = [];
  items.map((item) => {
    const similarityScore = stringSimilarity.compareTwoStrings(
      movieTitle,
      item.title
    );

    console.log(similarityScore);
    if (similarityScore >= 0.25) {
      movies.push(item);
    }
  });

  return movies;
}

function isDatePassedBy7Days(serverDateTime) {
  const one_day = 1000 * 60 * 60 * 24;
  const dateNow = new Date();

  const _dtSvr = Date.parse(serverDateTime);
  const _dtTxt = Date.parse(dateNow);

  return (_dtTxt - _dtSvr) / one_day > 7;
}

console.log("Movie Rating Bot is running...");
