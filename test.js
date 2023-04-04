var axios = require("axios");
require("dotenv").config();
const https = require('https');


var instance = axios.create({
  baseURL: "https://imdb-api.com/",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const IMDB_API_KEY = process.env.imdbAPIKEY;


async function getData() {

  const data = await instance.get(`en/API/Top250Movies/k_t8o2kalg`);

  console.log(data);
}
getData()