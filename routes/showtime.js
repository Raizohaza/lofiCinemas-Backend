const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Cinema = require('../models/cinema');
const ShowTime = require('../models/showtime');
const Cineplex = require('../models/cineplex');
const {GetShowTimeSeat} = require('../utils/CheckSeat');
// const ensureadmin = require('../middlewares/ensure_admin');
// router.use(ensureadmin);
router.use(function(req,res,next){
    res.locals.title = 'Showtime';
    next();
})


//create
router.post('/showtime/add',asyncHandler (async function(req,res){
    const showtime =await ShowTime.create(req.body);    
    res.send(showtime);
}));

//read
router.get('/showtimes',asyncHandler (async function(req,res){
    const showtimes = await ShowTime.findAll();
    res.send(showtimes);
}));
router.get('/showtime/:id/Movie',asyncHandler (async function(req,res){
    const MovieId = req.params.id;
    const showtimes = await ShowTime.findAll({include:[ {model: Cinema},{model: Movie} ],where:{MovieId}});
        res.send(showtimes);
    }));
router.get('/showtime/:id/Cinema',asyncHandler (async function(req,res){
    const CinemaId = req.params.id;
    const showtimes = await ShowTime.findAll({include:[ {model: Cinema},{model: Movie} ],where:{CinemaId}});
        res.send(showtimes);
    }));
router.get('/showtime/:id/Cineplex',asyncHandler (async function(req,res){
    const CineplexId = req.params.id;
    const cinemas = await Cinema.findAll({where:{CineplexId}});
    const arr =[];
     cinemas.forEach(cinema => {arr.push( cinema.id)});
    const showtimes = await ShowTime.findAll({include:[ {model: Cinema},{model: Movie} ],where:{CinemaId:arr}});
    res.send(showtimes);
    }));
router.get('/showtime/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const showtime = await ShowTime.findByPk(id);
    res.send(showtime);
    }));
//update
router.put('/showtime/:id',asyncHandler (async function(req,res){
    const id =req.params.id;
    const showtime =await ShowTime.update(req.body,{where:{id}});
    res.send(showtime);
}));

//delete
router.delete('/showtime/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const showtime = await ShowTime.findByPk(id);
    if(showtime){
        await showtime.destroy();
        res.send('delete success');
    }else{
        res.send('error');
    }
}));

//Cinema Seat
router.get('/showtime/:id/seat',asyncHandler (async function(req,res){
    const id = req.params.id;
    const seats = await GetShowTimeSeat(id);
    res.send(seats);
  }));

 module.exports = router;