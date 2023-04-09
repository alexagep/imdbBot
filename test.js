const movies = [
  {
    id: "tt0114709",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_Ratio0.6837_AL_.jpg",
    title: "Toy Story",
    description: "(1995)",
    runtimeStr: "81 min",
    genres: "Animation, Adventure, Comedy",
    genreList: [[Object], [Object], [Object]],
    contentRating: "G",
    imDbRating: "8.3",
    imDbRatingVotes: "1010331",
    metacriticRating: "96",
    plot: "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
    stars: "John Lasseter, Tom Hanks, Tim Allen, Don Rickles, Jim Varney",
    starList: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    id: "tt0099785",
    image:
      "https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6837_AL_.jpg",
    title: "Home Alone",
    description: "(1990)",
    runtimeStr: "103 min",
    genres: "Comedy, Family",
    genreList: [[Object], [Object]],
    contentRating: "PG",
    imDbRating: "7.7",
    imDbRatingVotes: "601032",
    metacriticRating: "63",
    plot: "An eight-year-old troublemaker, mistakenly left home alone, must defend his home against a pair of burglars on Christmas eve.",
    stars:
      "Chris Columbus, Macaulay Culkin, Joe Pesci, Daniel Stern, John Heard",
    starList: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    id: "tt0091042",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDA0NjZhZWUtNmI2NC00MmFjLTgwZDYtYzVjZmNhMDVmOTBkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6837_AL_.jpg",
    title: "Ferris Bueller's Day Off",
    description: "(1986)",
    runtimeStr: "103 min",
    genres: "Comedy",
    genreList: [[Object]],
    contentRating: "PG-13",
    imDbRating: "7.8",
    imDbRatingVotes: "366858",
    metacriticRating: "61",
    plot: "A high school wise guy is determined to have a day off from school, despite what the Principal thinks of that.",
    stars: "John Hughes, Matthew Broderick, Alan Ruck, Mia Sara, Jeffrey Jones",
    starList: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    id: "tt0120382",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_Ratio0.6837_AL_.jpg",
    title: "The Truman Show",
    description: "(1998)",
    runtimeStr: "103 min",
    genres: "Comedy, Drama",
    genreList: [[Object], [Object]],
    contentRating: "PG",
    imDbRating: "8.2",
    imDbRatingVotes: "1106596",
    metacriticRating: "90",
    plot: "An insurance salesman discovers his whole life is actually a reality TV show.",
    stars: "Peter Weir, Jim Carrey, Ed Harris, Laura Linney, Noah Emmerich",
    starList: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    id: "tt0097165",
    image:
      "https://m.media-amazon.com/images/M/MV5BOGYwYWNjMzgtNGU4ZC00NWQ2LWEwZjUtMzE1Zjc3NjY3YTU1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6837_AL_.jpg",
    title: "Dead Poets Society",
    description: "(1989)",
    runtimeStr: "128 min",
    genres: "Comedy, Drama",
    genreList: [[Object], [Object]],
    contentRating: "PG",
    imDbRating: "8.1",
    imDbRatingVotes: "504561",
    metacriticRating: "79",
    plot: "Maverick teacher John Keating uses poetry to embolden his boarding school students to new heights of self-expression.",
    stars:
      "Peter Weir, Robin Williams, Robert Sean Leonard, Ethan Hawke, Josh Charles",
    starList: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    id: "tt2096673",
    image:
      "https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_Ratio0.6837_AL_.jpg",
    title: "Inside Out",
    description: "(I) (2015)",
    runtimeStr: "95 min",
    genres: "Animation, Adventure, Comedy",
    genreList: [[Object], [Object], [Object]],
    contentRating: "PG",
    imDbRating: "8.1",
    imDbRatingVotes: "729500",
    metacriticRating: "94",
    plot: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.",
    stars:
      "Pete Docter, Ronnie Del Carmen, Amy Poehler, Bill Hader, Lewis Black, Mindy Kaling",
    starList: [[Object], [Object], [Object], [Object], [Object], [Object]],
  },
  {
    id: "tt1748122",
    image:
      "https://m.media-amazon.com/images/M/MV5BYTNjNjRhNjMtYTQyOS00MGIxLWJmZjktNGUxY2M2YTc4ZDYwXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_Ratio0.6837_AL_.jpg",
    title: "Moonrise Kingdom",
    description: "(2012)",
    runtimeStr: "94 min",
    genres: "Comedy, Drama, Family",
    genreList: [[Object], [Object], [Object]],
    contentRating: "PG-13",
    imDbRating: "7.8",
    imDbRatingVotes: "355320",
    metacriticRating: "84",
    plot: "A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.",
    stars:
      "Wes Anderson, Jared Gilman, Kara Hayward, Bruce Willis, Bill Murray",
    starList: [[Object], [Object], [Object], [Object], [Object]],
  },
  {
    id: "tt0432283",
    image:
      "https://m.media-amazon.com/images/M/MV5BOGUwYTU4NGEtNDM4MS00NDRjLTkwNmQtOTkwMWMyMjhmMjdlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6837_AL_.jpg",
    title: "Fantastic Mr. Fox",
    description: "(2009)",
    runtimeStr: "87 min",
    genres: "Animation, Adventure, Comedy",
    genreList: [[Object], [Object], [Object]],
    contentRating: "PG",
    imDbRating: "7.9",
    imDbRatingVotes: "241436",
    metacriticRating: "83",
    plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
    stars:
      "Wes Anderson, George Clooney, Meryl Streep, Bill Murray, Jason Schwartzman",
    starList: [[Object], [Object], [Object], [Object], [Object]],
  },
];

function getRandomMovies() {
  // const randomMovies = [];

  // while (randomMovies.length < 3) {
  //   const randomIndex = Math.floor(Math.random() * movies.length);
  //   const randomMovie = movies[randomIndex];

  //   // Check if the random movie is already in the result array
  //   if (!randomMovies.includes(randomMovie)) {
  //     randomMovies.push(randomMovie);
  //   }
  // }

  // return randomMovies;
  const final = movies
        .map(
          (item, index) =>
            `${index + 1}. ${item.title} ${item.description}\n\n⭐️ IMDb rating: ${
              item.imDbRating
            } (${parseInt(item.imDbRatingVotes).toLocaleString()})\n⏱  Time: ${item.runtimeStr}\n🎭 Genres: ${
              item.genres
            }\n🌟 Cast: ${item.stars}\n🔞 Content Rating: ${item.contentRating}\n🖼️  Image: ${item.image}`
        )
        .join("\n\n");

        return final
}

console.log(getRandomMovies());




