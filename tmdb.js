const Movies = require("./models/movie");
var axios = require("axios").default;
const apiKey = 'ad35e33e4bfa9e30b26fd40042726c51'
var options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/upcoming',
  params: {api_key: apiKey}
};

function CreateMovie_tmdb(data)
{
  //reformat obj to model movie
  let rObj ={};
  rObj.Name = data.original_title;
  rObj.Poster = "https://image.tmdb.org/t/p/w185" + data.poster_path;
  rObj.ReleaseDate = data.release_date;
  rObj.Description = data.overview;
  rObj.Duration = data.runtime;
  rObj.MID = data.id;
  rObj.Trailer = data.videosLink;
  rObj.Status = data.status == "Released" ? "Now playing" : "Comming soon";

  //update / insert 
  Movies.upsert(rObj);
}

async function getData(options){
  let response = await axios.request(options);
  return response.data;
}

async function connectApi(options,callback){

  //find now playing films
  let data = await getData(options);
  data.results.forEach(async (value) => {

    //detail films
    var subOptions = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/'+value.id,
      params: {api_key: apiKey, language: 'vi'}
    };
    let responseSub = await getData(subOptions);   

    //videos
    var videosOptions = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/'+value.id+'/videos',
      params: {api_key: apiKey}
    };
    let videosRes = await getData(videosOptions);    
    responseSub.videosLink = 'https://www.youtube.com/watch?v=' + videosRes.results[0].key;
    
    callback(responseSub);
  });

}

connectApi(options,CreateMovie_tmdb);
