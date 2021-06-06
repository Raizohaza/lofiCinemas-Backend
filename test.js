var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/get-videos',
  params: {tconst: 'tt0455275', limit: '25', region: 'US'},
  headers: {
    'x-rapidapi-key': '4e504ba0e1mshe0f60d3c597cc3ap11b3bajsn055ab2ebd17b',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});