const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const path = require('path');
const Movie = require('../models/movie');

router.use(function(req,res,next){
    res.locals.title = 'Movie';
    next();
})

router.get('/nowplaying',asyncHandler (async function(req,res){
    const nowplayings = await Movie.findAll({where:{ Status: 'Now playing'}});
    //const cinemas = await Cinema.findAll();
        res.send({Movie:nowplayings});
}));

router.get('/hot',asyncHandler (async function(req,res){
            const hots = await Movie.findAll({where:{ Status: 'Released'}});
            //const cinemas = await Cinema.findAll();
                res.send({Movie:hots});
                }));

router.get('/comingsoon',asyncHandler (async function(req,res){
    const comingsoons = await Movie.findAll({where:{ Status: 'Post Production'}});
 
            //const cinemas = await Cinema.findAll();
            res.send({Movie:comingsoons});
            }));

//create
router.post('/movie/add',asyncHandler(async function(req, res) {
    //multer.single('poster');
    const movie = await Movie.create(req.body);
    res.send(movie);
}));

//read
router.get('/movies',asyncHandler (async function(req,res){
    const movies = await Movie.findAll();
    res.send(movies);
    }));
router.get('/movie/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const movies = await Movie.findByPk(id);
    res.send(movies);
    }));

router.post('/movie/photo/:id', upload('movies').single('file'), async (req, res, next) => {
    const movieId = req.params.id;
    console.log(movieId);
    const url = `${req.protocol}://${req.get('host')}`;
    const { file } = req;
    try {
        if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
        }
        const movie = await Movie.findByPk(movieId);
        if (!movie) return res.sendStatus(404);
        movie.Poster = `${url}/${file.path}`;
        await movie.save();
        
        res.send({ movie });
    } catch (e) {
        console.log(e);
        res.sendStatus(400).send(e);
    }
    });
//update
router.put('/movie/:id',asyncHandler(async function(req, res) {
    const id = req.params.id;
    const movie = await Movie.update(req.body,{where:{id}});
    res.send(movie);
}));
//delete
router.delete('/movie/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const movie = await Movie.destroy({where:{id}});
    if(movie){
        res.send([1]);
    }else{
        res.send([0]);
    }
}));

 module.exports = router;