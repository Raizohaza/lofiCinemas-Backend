const Movie = require('../models/movie');
const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Cinema = require('../models/cinema');
router.use(function(req,res,next){
    res.locals.title = 'Home';
    next();
})

router.get('/nowplaying',asyncHandler (async function(req,res){
    const nowplayings = await Movie.findAll({where:{ Category: 'nowplaying'}});
    const cinemas = await Cinema.findAll();
        res.render('/home/phimdangchieu',{nowplayings,cinemas});
        }));

router.get('/hot',asyncHandler (async function(req,res){
            const hots = await Movie.findAll({where:{ Category: 'hot'}});
            const cinemas = await Cinema.findAll();
                res.render('/home/hot',{hots,cinemas});
                }));

router.get('/comingsoon',asyncHandler (async function(req,res){
    const comingsoons = await Movie.findAll({where:{ Category: 'comingsoon'}});
 
    const cinemas = await Cinema.findAll();
            res.render('/home/phimsapchieu',{comingsoons,cinemas});
            }));
    



    

module.exports = router;