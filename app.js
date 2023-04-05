const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const bot = new TelegramBot("5604371068:AAGR-VofEj8CSuRHQZDFW7sD5nPz3kcc690", {
  polling: true,
});

const staticKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [
      ["🎥 Search Movie", "🔝 Top250"],
      ["🎭 Coming Soon", "💰 Box Office"],
      ["💰📈 Box Office AllTime"],
    ],
    one_time_keyboard: false,
    resize_keyboard: true,
  }),
};

bot.onText(/\/start/, (msg) => {
  try {
    console.log("****************");
    const chatId = msg.chat.id;
    const welcomeMessage =
      "Welcome to the IMDB Bot! Send me the title of a movie, and I will return its IMDb rating. Select an option:";
    bot.sendMessage(chatId, welcomeMessage, staticKeyboard);
  } catch (error) {
    console.log(error);
  }
});

bot.on("message", (msg) => {
  console.log("Received message:", msg.text);
});

console.log("Movie Rating Bot is running...");
