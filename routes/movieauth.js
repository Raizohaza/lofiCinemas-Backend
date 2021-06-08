const Movies = require('../models/movie');
const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Cinema = require('../models/cinema');
router.use(function(req,res,next){
    res.locals.title = 'Home';
    next();
})

router.get('/nowplaying',asyncHandler (async function(req,res){
    const nowplayings = await Movies.findAll({where:{ Status: 'Now playing'}});
    //const cinemas = await Cinema.findAll();
        res.send({Movies:nowplayings});
}));

router.get('/hot',asyncHandler (async function(req,res){
            const hots = await Movies.findAll({where:{ Status: 'Released'}});
            //const cinemas = await Cinema.findAll();
                res.send({Movies:hots});
                }));

router.get('/comingsoon',asyncHandler (async function(req,res){
    const comingsoons = await Movies.findAll({where:{ Status: 'Post Production'}});
 
            //const cinemas = await Cinema.findAll();
            res.send({Movies:comingsoons});
            }));
module.exports = router;