const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Cineplex = require('../models/cineplex');
const ensureadmin = require('../middlewares/ensure_admin');
router.use(ensureadmin);
router.use(function(req,res,next){
    res.locals.title = 'Cineplex';
    next();
})

//create

router.post('/Cineplex/add',asyncHandler (async function(req,res){
    const {name,address} = req.body;

    const Cineplex = await Cineplex.create({Name: name,Address:address});
    if(Cineplex){
        res.redirect('/Cineplex');
    }else{
        res.send('error');
    }
}));
//update

router.post('/Cineplex/update/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const {name,address} = req.body;
    const Cineplex = await Cineplex.findByPk(id);
    if(Cineplex){
        if(name){
            Cineplex.Name = name;
        }
        if(address){
            Cineplex.Address = address;
        }
       
        await Cineplex.save();
        res.redirect('/Cineplex');
    }else{
        res.send('error');
    }
}));
//delete
router.get('/Cineplex/delete/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const Cineplex = await Cineplex.findByPk(id);
    if(Cineplex){
        await Cineplex.destroy();
        res.redirect('/Cineplex');
    }else{
        res.send('error');
    }
}));
module.exports = router;
