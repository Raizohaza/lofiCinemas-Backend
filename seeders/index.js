const CreateCinema = require("./cinema");
const CreateCineplex = require("./cineplex");
const CreateShowtime = require("./showtime");
const CreateBooking = require('./booking');
function seeders(){
    setTimeout(() => {
        CreateCineplex();
    }, 1000);
    setTimeout(() => {
        CreateCinema();
    }, 2000); 
    setTimeout(() => {
        CreateShowtime();
    }, 3000); 
    setTimeout(() => {
        CreateBooking();
    }, 4000);
    // new Promise(()=> CreateCineplex())
    //     .then(()=>new Promise(()=>CreateCinema())
    //         .then(()=>new Promise(()=>CreateShowtime())
    //             .then(()=>CreateBooking())));
}
seeders();