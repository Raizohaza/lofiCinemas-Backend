const CreateCinema = require("./cinema");
const CreateCineplex = require("./cineplex");
const CreateShowtime = require("./showtime");
function seeders(){
    setTimeout(() => {
        CreateCineplex();
    }, 1000);
    setTimeout(() => {
        CreateCinema();
    }, 1000); 
    setTimeout(() => {
        CreateShowtime();
    }, 1000); 
}
seeders();