const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage:  multer.memoryStorage() });
const path = require('path');
const Movie = require('../models/movie');
router.use(express.static(__dirname+'/public/images'));

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
router.post('/movies',asyncHandler (async function(req,res){
    const movies = await Movie.findAll();
    res.send(movies);
    }));
router.post('/movie/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const movies = await Movie.findByPk(id);
    res.send(movies);
    }));

//update
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        
    }
});

router.put('/movie/:id/update',asyncHandler(async function(req, res) {
    const id = req.params.id;
    const movie = await Movie.update(req.body,{where:{id}});
    res.send(movie);
}));
//delete
router.delete('/movie/:id/delete',asyncHandler (async function(req,res){
    const id = req.params.id;
    const movie = await Movie.destroy({where:{id}});
    if(movie){
        res.send([1]);
    }else{
        res.send([0]);
    }
}));

 module.exports = router;