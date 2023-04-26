const ffmpeg = require('ffmpeg');

async function compressVideo() {
  try {
    const input = await ffmpeg(`./compressed/video.mp4`);
    await input
      .setVideoBitrate('500k') // set the video bitrate to 500k
      .setAudioBitrate('128k') // set the audio bitrate to 128k
      .save(`./compressed/video.mp4`);
  } catch (err) {
    console.error(err);
  }
}

// callback query for downloading trailer
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
    video.pipe(fs.createWriteStream(filePath)).on("finish", async () => { 
      // Compress the video
      await compressVideo();

      // Send the compressed video to the user
      bot.sendVideo(chatId, fs.createReadStream(`./compressed/video.mp4`));

      // Remove the downloaded and compressed files
      fs.unlinkSync(filePath);
      fs.unlinkSync(`./compressed/video.mp4`);
    });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "Error downloading the movie.");
  }
}
