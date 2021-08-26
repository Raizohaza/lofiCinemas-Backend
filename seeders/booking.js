const Showtime = require('../models/showtime');
const User = require('../models/user');
const Booking = require("../models/booking");
const {GetShowTimeSeat} = require('../utils/CheckSeat');
const axios  = require('axios');
const dirname = __dirname.replace('seeders','');
require('dotenv').config({path: dirname + '/.env'});

async function randomSeat(n,ShowtimeId){
    let Seats = [];
    let Price = [];
    let availableSeat = await GetShowTimeSeat(ShowtimeId);
    for (let i = 0; i < n; i++) {
        let rng = Math.floor(Math.random() * availableSeat.length);
        while(Seats.includes(availableSeat[rng])){
            rng = Math.floor(Math.random() * availableSeat.length);   
        }
        Seats.push(availableSeat[rng]);  
        Price.push(45000);
    }
    return{ Seats,Price};
};
async function CreateBooking(){
    var showtime =await Showtime.findAll({raw:true,attributes:['id']});
    var user =await User.findAll({raw:true,attributes:['id']});
    let start = new Date(new Date().setDate(new Date().getDate() - 7));
    let end = new Date(new Date().setDate(new Date().getDate() + 7));
    let host = process.env['APP_BACK_URL'] || 'https://loficinema.herokuapp.com';

    for (let i = 0; i < 50; i++) {
      let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      let randomShowtime = Math.floor(Math.random() * showtime.length);
      let randomUser = Math.floor(Math.random() * user.length);
      let number = Math.floor(Math.random() * (5 - 1) + 1);
      let {Seats,Price} = await randomSeat(number,showtime[randomShowtime].id,);
      const seedData = {         
        DateTime: date,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: user[randomUser].id,
        ShowTimeId: showtime[randomShowtime].id,
        Seats: Seats,
        Price: Price
      };
      axios.post(host+'/booking/add',seedData).then(res => console.log(res.data));//||'https://lofi-cinemas.herokuapp.com/booking/add'
    }
};
module.exports = {CreateBooking};
