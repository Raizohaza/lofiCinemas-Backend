const Movies = require("./models/movie");
var axios = require("axios").default;
var options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/auto-complete',
  params: {q: 'Wall-e'},
  headers: {
    'x-rapidapi-key': '847af423c6msh5f65353fbaa918cp15dc05jsnc8b612e4245e',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
  }
};


function CreateMovie_imdb(data)
{
  //console.log(data);

  let rObj ={};
  rObj.Name = data.l;
  rObj.Poster = data.i.imageUrl;
  rObj.ReleaseDate = data.y;
  rObj.Decription = data.l;
  rObj.Category = data.q;
  console.log(rObj);
  Movies.create(rObj);
}
function connectApi(options,callback){
    axios.request(options).then(function (response) {
      let data = response.data;
      //console.log(data);
      data.d.forEach((value) => {
        var v = JSON.stringify(value);
        v = JSON.parse(v);
        callback(v);
      });
      
    }).catch(function (error) {
      console.error(error);
    });
  }
  
  connectApi(options,CreateMovie_imdb);