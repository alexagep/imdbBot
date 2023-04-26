const db = require("./db/models/index");
const Movie = db.Movie;
const Genre = db.Genre;
const MovieGenre = db.MovieGenre;
const { Op } = require("sequelize");

async function getAllMovie() {
  const MovieList = await Movie.findAll();
  console.log(MovieList.length);
}
getAllMovie();

async function getAllSeries() {
  try {
    const MovieGenreRow = await Genre.findAll({
      include: [
        {
          model: MovieGenre,
          include: [
            {
              model: Movie,
              where: {
                rating: {
                  [Op.gt]: 6.7, // Only retrieve movies with a rating over 6.7
                },
                totalVotes: {
                  [Op.gt]: 1200, // Only retrieve movies with a totalVotes over 1200
                },
                contentRating: {
                  [Op.in]: ["TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"], // Only retrieve movies with these content ratings
                },
              },
            },
          ],
        },
      ],
    });

    const data = MovieGenreRow[0].MovieGenres;

    console.log(data.length, "SERIES_FOUND_OR_NOT");
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

getAllSeries();

async function getAllMovieGenre() {
  // console.log(genreId);
  try {
    const MovieGenreRow = await Genre.findAll({
      include: [
        {
          model: MovieGenre,
          include: [
            {
              model: Movie,
              where: {
                rating: {
                  [Op.gt]: 6.7, // Only retrieve movies with a rating over 6.7
                },
                totalVotes: {
                  [Op.gt]: 1200, // Only retrieve movies with a totalVotes over 1200
                },
                contentRating: {
                  [Op.in]: ["G", "PG", "PG-13", "R", "NC-17"], // Only retrieve movies with these content ratings
                },
              },
            },
          ],
        },
      ],
    });

    const data = MovieGenreRow[0].dataValues.MovieGenres;

    // console.log(MovieGenreRow, "MOVIEGENRE_FOUND_OR_NOT");
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

getAllMovieGenre();




// video.pipe(fs.createWriteStream(filePath)).on('finish', () => {
//   // Send the video to the user
//   bot.sendVideo(chatId, fs.createReadStream(filePath)).then(() => {
//     // Remove the file from the folder
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(`File ${filePath} has been deleted.`);
//       }
//     });
//   });
// });


// const ffmpeg = require('ffmpeg');

// async function compressVideo(filePath) {
//   try {
//     const input = await ffmpeg(`./downloads/${filePath}`);
//     await input
//       .setVideoBitrate('500k') // set the video bitrate to 500k
//       .setAudioBitrate('128k') // set the audio bitrate to 128k
//       .save(`./compressed/${filePath}`);
//   } catch (err) {
//     console.error(err);
//   }
// }

// // usage
// const filePath = 'video.mp4';
// compressVideo(filePath);

