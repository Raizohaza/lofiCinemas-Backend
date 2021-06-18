const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Cinema = require('../models/cinema');
const Cineplex = require('../models/cineplex');
// const ensureadmin = require('../middlewares/ensure_admin');
//router.use(ensureadmin);
router.use(function(req,res,next){
    res.locals.title = 'cinema';
    next();
})
//create


router.post('/cinema/add',asyncHandler (async function(req,res){
    const cinema = await Cinema.create(req.body);
    res.send(cinema);
}));

//read
router.post('/cinemas',asyncHandler (async function(req,res){
    const cinemas = await Cinema.findAll();
    res.send(cinemas);
}));
router.post('/cinema/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const cinemas = await Cinema.findByPk(id);
    res.send(cinemas);
    }));

//update
router.put('/cinema/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const cinema = await Cinema.update(req.body,{where: {id}});
    res.send(cinema);
}));
//delete
router.delete('/cinema/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const cinema = await Cinema.destroy({where: {id}});
    if(cinema){        
        res.send([1]);
    }else{
        res.send([0]);
    }
}));

module.exports = router;

