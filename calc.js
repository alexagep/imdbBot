const data = {
  imDbId: "tt1375666",
  title: "Inception",
  fullTitle: "Inception (2010)",
  type: "Movie",
  year: "2010",
  totalRating: "8.8",
  totalRatingVotes: "0",
  ratings: [
    { rating: "10", percent: "34.5%", votes: "822369" },
    { rating: "9", percent: "30.5%", votes: "727604" },
    { rating: "8", percent: "20.1%", votes: "479807" },
    { rating: "7", percent: "8.5%", votes: "202369" },
    { rating: "6", percent: "2.9%", votes: "69454" },
    { rating: "5", percent: "1.3%", votes: "30344" },
    { rating: "4", percent: "0.6%", votes: "15036" },
    { rating: "3", percent: "0.4%", votes: "9674" },
    { rating: "2", percent: "0.3%", votes: "7819" },
    { rating: "1", percent: "0.9%", votes: "21086" },
  ],
  demographicAll: {
    allAges: { rating: "8.8", votes: "2385562" },
    agesUnder18: { rating: "9.0", votes: "1038" },
    ages18To29: { rating: "9.0", votes: "320709" },
    ages30To44: { rating: "8.8", votes: "951796" },
    agesOver45: { rating: "8.2", votes: "198809" },
  },
  demographicMales: {
    allAges: { rating: "8.8", votes: "1281072" },
    agesUnder18: { rating: "9.0", votes: "756" },
    ages18To29: { rating: "9.0", votes: "240975" },
    ages30To44: { rating: "8.9", votes: "760562" },
    agesOver45: { rating: "8.2", votes: "163418" },
  },
  demographicFemales: {
    allAges: { rating: "8.7", votes: "297973" },
    agesUnder18: { rating: "8.9", votes: "212" },
    ages18To29: { rating: "8.8", votes: "67130" },
    ages30To44: { rating: "8.7", votes: "174671" },
    agesOver45: { rating: "8.2", votes: "30745" },
  },
  top1000Voters: { rating: "8.3", votes: "908" },
  usUsers: { rating: "8.7", votes: "480343" },
  nonUSUsers: { rating: "8.8", votes: "1578842" },
  errorMessage: "",
};


console.log(data.demographicAll);