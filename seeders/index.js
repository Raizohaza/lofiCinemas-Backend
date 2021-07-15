const CreateCinema = require("./cinema");
const CreateCineplex = require("./cineplex");
const CreateShowtime = require("./showtime");
async function seeders(){
    CreateCineplex();
    CreateCinema();
    CreateShowtime();
}
seeders();