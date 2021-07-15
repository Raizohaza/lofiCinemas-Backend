const Showtime = require('../models/showtime');
const User = require('../models/user');
const Booking = require("../models/booking");
const {AvailableSeat} = require('../utils/CheckSeat');
const axios  = require('axios');
const os = require('os');
async function randomSeat(n,ShowtimeId){
    let Seats = [];
    let Price = [];
    let availableSeat = await AvailableSeat(ShowtimeId);
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
    var newData = [];
    var showtime =await Showtime.findAll({raw:true,attributes:['id']});
    var user =await User.findAll({raw:true,attributes:['id']});
    let start = new Date(2021, 0, 1);
    let end = new Date();

    for (let i = 0; i < 10; i++) {
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
      //newData.push(seedData);
      console.log(seedData);
      axios.post('http://localhost:5000/booking/add',seedData).then(res => console.log(res.data));//||'https://lofi-cinemas.herokuapp.com/booking/add'
    }
    //Booking.bulkCreate(newData);
    //console.log(newData);

};
// module.exports = CreateBooking;
//randomSeat(3,1);
CreateBooking();