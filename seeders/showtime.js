'use strict';
const Movie = require('../models/movie');
const Cinema = require('../models/cinema');
const Showtime = require("../models/showtime");
async function CreateShowtime(){
    var newData = [];
    var movie =await Movie.findAll({raw:true,attributes:['id']});
    var cinema =await Cinema.findAll({raw:true,attributes:['id']});
    let start = new Date().setDate(new Date().getDate() - 7);
    let end = new Date().setDate(new Date().getDate() + 7);
    for (let i = 0; i < 500; i++) {
      let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      let randomMovie = Math.floor(Math.random() * movie.length);
      let randomCinema = Math.floor(Math.random() * cinema.length);
      const seedData = {         
        TimeBegin: date,
        DateShow: date,
        Price: 45000,
        MovieId: movie[randomMovie].id,
        CinemaId: cinema[randomCinema].id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }
    Showtime.bulkCreate(newData);
};
module.exports = CreateShowtime;