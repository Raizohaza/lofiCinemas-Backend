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
//create
router.post('/movies',asyncHandler (async function(req,res){
    const movies = await Movie.findAll();
    res.send(movies);
    }));
router.post('/movie/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const movies = await Movie.findByPk(id);
    res.send(movies);
    }));    

router.post('/movie/add',asyncHandler(async function(req, res) {

    //multer.single('poster');
    const {Name,Duration,Releasedate,Poster,Decription,Status,Trailer,Genres,MID} = req.body;
    const movie = await Movie.create(req.body);
    if(movie){

        //movie.Poster = req.file.buffer;
        await movie.save();
        res.send('them thanh cong');
    }else{
        res.send('error');
    }
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

router.put('/movie/update/:id',asyncHandler(async function(req, res) {
    const id = req.params.id;
    const {name,duration,releasedate,decription,status,trailer} = req.body;
    const movie = await Movie.findByPk(id);
    if(movie){
        if(name){
            movie.Name = name;
        }
        if(duration){
            movie.Duration = duration;
        }
        if(releasedate){
            movie.ReleaseDate = releasedate;
        }
        if(status){
            movie.Status = status;
        }
        if(req.file){
            movie.Poster = req.file.buffer;
            
        }
       if(decription){
           movie.Decription = decription;
       }
       if(trailer){
           movie.Trailer = trailer;
       }
        await movie.save();
        res.send('update thanh cong');

    }else{
        res.send('error');
    }
}));
//delete
router.delete('/movie/:id/delete',asyncHandler (async function(req,res){
    const id = req.params.id;
    const movie = await Movie.findByPk(id);
    if(movie){
        await movie.destroy();
        res.send('xoa thanh cong');
    }else{
        res.send('error');
    }
}));

 module.exports = router;