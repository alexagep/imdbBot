const axios = require('axios');
const fs = require('fs');

async function downloadVideo(url) {
  const response = await axios({
    url: url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(fs.createWriteStream('video.mp4'));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve('video.mp4');
    });

    response.data.on('error', (err) => {
      reject(err);
    });
  });
}

const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const videoUrl = `https://www.youtube.com/watch?v=vi2959588889`;

  const response = await axios({
    url: videoUrl,
    method: 'GET',
    responseType: 'stream',
  });

  bot.sendVideoStream(chatId, response.data, {caption: 'VIDEO_CAPTION'});
});
