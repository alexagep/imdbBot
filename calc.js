const ratings = [
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
];


function calc () {
    let count = 0
    ratings.map(rate => {
        count += parseInt(rate.votes)
    })
    console.log(count.toLocaleString());
}

calc()