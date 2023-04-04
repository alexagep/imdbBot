var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://imdb-api.com/en/API/Title/k_1234567/tt1832382',
  'headers': {
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
