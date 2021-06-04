const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Cinema = require('../models/cinema');
const Cineplex = require('../models/cineplex');
const ensureadmin = require('../middlewares/ensure_admin');
router.use(ensureadmin);
router.use(function(req,res,next){
    res.locals.title = 'Theater';
    next();
})
//create
router.get('/theater',asyncHandler (async function(req,res){
    const cinemas = await Cinema.findAll();
    const theaters = await Theater.findAll({include: Cinema});
    res.render('theater/theater',{cinemas,theaters});
}));

router.get('/theater/add',asyncHandler (async function(req,res){
    const cinemas = await Cinema.findAll();
    res.render('theater/addtheater',{cinemas});
}));
    

router.post('/theater/add',asyncHandler (async function(req,res){
    const {name,width,height,category,CinemaId} = req.body;
    const cinema = await Cinema.findByPk(CinemaId);
    if(cinema){
        const theater = await cinema.createTheater({Name: name,Width: width , Height: height, Category: category });
        if(theater){
            res.redirect('/theater');
        }else{
            res.send('error');
        }
    }else{
        res.send('error');
    }
}));

//update
router.get('/theater/update/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const theater = await Theater.findByPk(id);
    const cinemas = await Cinema.findAll();
    res.locals.title = theater.Name;
    res.render('theater/updatetheater',{theater,cinemas});
    }));

router.post('/theater/update/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const {name,width,height,category,CinemaId} = req.body;
    const theater = await Theater.findByPk(id);
    if(theater){
        if(name){
            theater.Name = name;
        }
        theater.Width = width;
        theater.Height = height;
        theater.Category = category;
        theater.CinemaId = CinemaId;
        await theater.save();
        res.redirect('/theater');
    }else{
        res.send('error');
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

