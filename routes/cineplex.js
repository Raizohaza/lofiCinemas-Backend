const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Cineplex = require('../models/cineplex');
// const ensureadmin = require('../middlewares/ensure_admin');
// router.use(ensureadmin);
router.use(function(req,res,next){
    res.locals.title = 'Cineplex';
    next();
})

//create

router.post('/Cineplex/add',asyncHandler (async function(req,res){

    const cineplex = await Cineplex.create(req.body);
    res.send(cineplex);
}));

//read
router.post('/cineplexes',asyncHandler (async function(req,res){
    const cineplexes = await Cineplex.findAll();
    res.send(cineplexes);
}));
router.post('/cineplex/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const cineplexes = await Cineplex.findByPk(id);
    res.send(cineplexes);
    }));

//update
router.put('/cineplex/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const cineplex = await Cineplex.update(req.body,{where: {id}});
    res.send(cineplex);
}));

//delete
router.delete('/cineplex/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const cineplex = await Cineplex.destroy({where:{id:id}});
    if(cineplex){
        res.send([1]);
    }else{
        res.send([0]);
    }
}));

module.exports = router;
