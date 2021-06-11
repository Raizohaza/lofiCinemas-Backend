const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Cinema = require('../models/cinema');
const ShowTime = require('../models/showtime');
// const ensureadmin = require('../middlewares/ensure_admin');
// router.use(ensureadmin);
router.use(function(req,res,next){
    res.locals.title = 'Showtime';
    next();
})


//create
router.post('/showtime/add',asyncHandler (async function(req,res){
    const showtime =await ShowTime.create(res.body);
    res.send(showtime);
}));

router.post('/showtime/:id/update',asyncHandler (async function(req,res){
    const showtime =await ShowTime.update(res.body,{where:{MovieId,CinemaId}});
    res.send(showtime);
}));

//read
router.get('/showtime',asyncHandler (async function(req,res){
    const showtimes = await ShowTime.findAll({include:[ {model: Theater},{model: Movie} ]});
        res.render('showtime/showtime',{showtimes});
    }));
router.post('/showtime/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const showtime = await ShowTime.findByPk(id);
    res.send(showtime);
    }));

//delete
router.delete('/showtime/:id/delete',asyncHandler (async function(req,res){
    const id = req.params.id;
    const theater = await Theater.findByPk(id);
    if(theater){
        await theater.destroy();
        res.send('delete success');
    }else{
        res.send('error');
    }
}));


 module.exports = router;