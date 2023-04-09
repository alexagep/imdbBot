const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fetch = require("node-fetch");
const stringSimilarity = require("string-similarity");
const request = require('request');

require("dotenv").config();
// const { dom, library } = require("@fortawesome/fontawesome-svg-core");
// const { faComment } = require("@fortawesome/free-solid-svg-icons");
// const { faImdb } = require("@fortawesome/free-brands-svg-icons");

// library.add(faComment, faImdb);

const TELEGRAM_API_KEY = process.env.telegramAPIKEY;
const OMDB_API_KEY = process.env.omdbAPIKEY;
const IMDB_API_KEY = process.env.imdbAPIKEY;

const IMDB_TOP_250_URL = `https://imdb-api.com/en/API/Top250Movies/${IMDB_API_KEY}`;
const IMDB_ARTIST_NAME = `https://imdb-api.com/en/api/SearchName/${IMDB_API_KEY}`;
const IMDB_BOX_OFFICE = `https://imdb-api.com/en/api/BoxOffice/${IMDB_API_KEY}`;
const IMDB_BOX_OFFICE_ALLTIME = `https://imdb-api.com/en/API/BoxOfficeAllTime/${IMDB_API_KEY}`;
const IMDB_USER_RATINGS = `https://imdb-api.com/en/API/UserRatings/${IMDB_API_KEY}`;
const IMDB_COMING_SOON = `https://imdb-api.com/en/api/ComingSoon/${IMDB_API_KEY}`;
const OMDB_SEARCH_GENRES = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=&type=movie&plot=short&r=json&genre=`;
const IMDB_SEARCH_GENRE = `https://imdb-api.com/API/AdvancedSearch/${OMDB_API_KEY}?user_rating=7.0,&genres=thriller&groups=top_1000&languages=en`;

const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });
// library.add(faComment, faImdb);

const limitMessage =
  "You have reached the daily limit for using our API key. Please wait until tomorrow to resume using our Telegram bot.";

const staticKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [
      ["🎥 Search Movie", "🔝 Top250"],
      ["🎭 Coming Soon", "💰 Box Office Weekend"],
      ["💰📈 Box Office AllTime"],
      ["🍿🤖 Recommend Movie"],
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

//box office weekend
bot.onText(/Box Office Weekend/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch(IMDB_BOX_OFFICE);
    const data = await response.json();

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
bot.onText(/Box Office AllTime/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch(IMDB_BOX_OFFICE_ALLTIME);
    const data = await response.json();

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
              callback_data: `next_allTime_movies_${25}`,
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

let movie_ID = null;
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
    msg.text.startsWith("🍿")
  )
    return;

  try {
    const response = await fetch(
      `https://imdb-api.com/en/API/SearchMovie/${IMDB_API_KEY}/${movieTitle}`
    );
    const data = await response.json();

    const movie = data.results;

    if (movie.length > 0) {
      const similarityScore = stringSimilarity.compareTwoStrings(
        movieTitle,
        movie[0].title
      );
      console.log(similarityScore);
      if (similarityScore >= 0.3) {
        const movieId = movie[0].id;

        const ratingsResp = await fetch(
          `https://imdb-api.com/en/API/Ratings/${IMDB_API_KEY}/${movieId}`
        );

        const ratings = await ratingsResp.json();

        // const urResponse = await fetch(IMDB_USER_RATINGS);

        // const UserRatings = await urResponse.json();

        movie_ID = movieId;

        const imdbUrl = `https://www.imdb.com/title/${movieId}`;
        const keyboard = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "User Ratings",
                  callback_data: "user_ratings",
                },
              ],
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
          `🎬 ${ratings.fullTitle}\n🌟 IMDb Rating: ${ratings.imDb}\n🌟 Metacritic Rating: ${ratings.metacritic}/100\n🍅 RottenTomatoes Rating: ${ratings.rottenTomatoes}/100 `,
          keyboard
        );
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

  if (match) {
    const startIndex = parseInt(match[1], 10);
    const endIndex = startIndex + 50;

    try {
      const response = await fetch(IMDB_TOP_250_URL);
      const data = await response.json();
      const topMovies = data.items
        .slice(startIndex, endIndex)
        .map((item, index) => `${startIndex + index + 1}. ${item.title}`)
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
  if (callbackQuery.data === "user_ratings") {
    // Send the user ratings data
    if (movie_ID !== null) {
      const urResponse = await fetch(`${IMDB_USER_RATINGS}/${movie_ID}`);

      const UserRatings = await urResponse.json();
      // console.log(UserRatings, UserRatings.demographicAll, UserRatings.demographicMales, UserRatings.demographicFemales,  "************");
      // movie_ID = null;
      bot.sendMessage(
        chatId,
        `All Votes: ${parseInt(
          UserRatings.demographicAll.allAges.votes
        ).toLocaleString()}\n\n"The following ratings and votes are categorized based on different age groups and genders:"\n\n🧒 Under 18: ${
          UserRatings.demographicAll.agesUnder18.rating
        } (${parseInt(
          UserRatings.demographicAll.agesUnder18.votes
        ).toLocaleString()})\n👨🏻‍🎓 18-29: ${
          UserRatings.demographicAll.ages18To29.rating
        } (${parseInt(
          UserRatings.demographicAll.ages18To29.votes
        ).toLocaleString()})\n👨🏽‍💼 30-44: ${
          UserRatings.demographicAll.ages30To44.rating
        } (${parseInt(
          UserRatings.demographicAll.ages30To44.votes
        ).toLocaleString()})\n👴🏾 Over 45: ${
          UserRatings.demographicAll.agesOver45.rating
        } (${parseInt(
          UserRatings.demographicAll.agesOver45.votes
        ).toLocaleString()})\n\n👨🏼 Males: ${
          UserRatings.demographicMales.allAges.rating
        } (${parseInt(
          UserRatings.demographicMales.allAges.votes
        ).toLocaleString()})\n👩🏻 Females: ${
          UserRatings.demographicFemales.allAges.rating
        } (${parseInt(
          UserRatings.demographicFemales.allAges.votes
        ).toLocaleString()})`
      );
    }
  }
  console.log(callbackQuery.data);
  if (genres.includes(callbackQuery.data.toLowerCase())) {
    // Send the user ratings data
    const genre = callbackQuery.data.toLowerCase();
    if (genre !== null) {
      console.log(
        `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=7.0,&genres=${genre}&groups=top_1000&languages=en`
      );
      const url = `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=7.0,&genres=${genre}&groups=top_1000&languages=en`;
      const urResponse = await fetch(url);

      const res = await urResponse.json();
      // console.log(res.results, res.results.length, "************");

      const movies = getRandomMovies(res.results);

      // const final = movies
      //   .map(
      //     (item, index) =>
      //       `${index + 1}. ${item.title} ${item.description}\n\n⭐️ IMDb rating: ${
      //         item.imDbRating
      //       } (${parseInt(item.imDbRatingVotes).toLocaleString()})\n⏱ Time: ${item.runtimeStr}\n🎭 genres: ${
      //         item.genres
      //       }\n🌟 Cast: ${item.stars}\n🔞 Content Rating: ${item.contentRating}\n🖼️ Image: ${item.image}`
      //   )
      //   .join("\n\n");

      // bot.sendMessage(chatId, `Recommended movies: \n\n${final}`);

      movies.forEach((movie, index) => {
        // Download the image and send it
        request.get(movie.image, { encoding: null }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const photo = { source: body };
            const message = `${index + 1}. ${movie.title} ${movie.description}\n\n⭐️ IMDb rating: ${movie.imDbRating} (${parseInt(movie.imDbRatingVotes).toLocaleString()})\n⏱  Time: ${movie.runtimeStr}\n🎭 Genres: ${movie.genres}\n🌟 Cast: ${movie.stars}\n🔞 Content Rating: ${movie.contentRating}\n🖼️  Image: ${movie.image}`;
            bot.sendPhoto(
              chatId,
              photo,
              {
                caption: message,
              },
            );
          }
        });
      });
      
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

function getRandomMovies(movies) {
  const randomMovies = [];

  while (randomMovies.length < 3) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    // Check if the random movie is already in the result array
    if (!randomMovies.includes(randomMovie)) {
      randomMovies.push(randomMovie);
    }
  }

  return randomMovies;
}

console.log("Movie Rating Bot is running...");
