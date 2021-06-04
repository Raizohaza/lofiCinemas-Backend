const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Theater = require('../models/theater');
const ShowTime = require('../models/showtime');
const ensureadmin = require('../middlewares/ensure_admin');
router.use(ensureadmin);
router.use(function(req,res,next){
    res.locals.title = 'Showtime';
    next();
})
//create
router.get('/showtime',asyncHandler (async function(req,res){
    const showtimes = await ShowTime.findAll({include:[ {model: Theater},{model: Movie} ]});
        res.render('showtime/showtime',{showtimes});
    }));

    router.get('/showtime/add',asyncHandler (async function(req,res){
        const theaters = await Theater.findAll();
        const movies = await Movie.findAll();
            res.render('showtime/addshowtime',{movies,theaters});
        }));
    

router.post('/showtime/add',asyncHandler (async function(req,res){
    const {MovieId,TheaterId,timebegin,timefinish,price,dateshow} = req.body;
    const showtime =await ShowTime.findOne({where:{MovieId:MovieId,TheaterId:TheaterId,TimeBegin:timebegin,DateShow:dateshow}});

    if(showtime){
        res.send('error');
    }else{
        const newshowtime = await ShowTime.create({TimeBegin:timebegin,MovieId:MovieId,TheaterId:TheaterId,TimeFinish:timefinish,Price:price,DateShow: dateshow});
        if(newshowtime){
            res.redirect('/showtime');
        }else{
            res.send('error');
        }
    }
}));



//delete
router.get('/theater/delete/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const theater = await Theater.findByPk(id);
    if(theater){
        await theater.destroy();
        res.redirect('/theater');
    }else{
        res.send('error');
    }
}));


 module.exports = router;