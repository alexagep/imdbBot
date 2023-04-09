bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const genre = callbackQuery.data.toLowerCase();
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

  // Initial callback query handling
  if (genres.includes(callbackQuery.data.toLowerCase())) {
    if (genre !== null) {
      await generateRecommendation(genre, chatId);
    }
  }

  // New recommendation callback query handling
  if (callbackQuery.data === "new_recommendation") {
    await generateRecommendation(genre, chatId);
    await bot.deleteMessage(chatId, messageId);
  }
});

function getRandomMovies(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];

  return randomMovie;
}

async function generateRecommendation(genre, chatId) {
  const url = `https://imdb-api.com/API/AdvancedSearch/${IMDB_API_KEY}?user_rating=7.0,&genres=${genre}&groups=top_1000&languages=en`;
  const urResponse = await fetch(url);
  const res = await urResponse.json();
  const movie = getRandomMovies(res.results);

  const response = await fetch(movie.image);
  const buffer = await response.buffer();

  const resizedBuffer = await sharp(buffer)
    .resize({ width: 1280, height: 1024, fit: "inside" })
    .toBuffer();

  const message = `🎥 ${movie.title} ${movie.description}\n\n⭐️ IMDb rating: ${
    movie.imDbRating
  } (${parseInt(movie.imDbRatingVotes).toLocaleString()})\n⏱ Time: ${
    movie.runtimeStr
  }\n🎭 Genres: ${movie.genres}\n🌟 Cast: ${movie.stars}\n🔞 Content Rating: ${
    movie.contentRating
  }\n`;

  const imdbUrl = `https://www.imdb.com/title/${movie.id}`;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "New Recommendation",
            callback_data: "new_recommendation",
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

  bot.sendPhoto(
    chatId,
    resizedBuffer,
    {
      caption: message,
    },
    opts
  );

//   bot.sendMessage(chatId, `Do you want a new recommendation?`, opts);
}
