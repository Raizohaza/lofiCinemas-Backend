const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

//create
router.post('/booking/add',asyncHandler (async function(req,res){
    const booking = await Booking.create(req.body);
    res.send(booking);
}));

//read
router.post('/booking',asyncHandler (async function(req,res){
    const booking = await Booking.findAll();
    res.send(booking);
}));
router.post('/booking/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const booking = await Booking.findByPk(id);
    res.send(booking);
    }));

//update
router.post('/booking/:id/update',asyncHandler (async function(req,res){
    const id = req.params.id;
    const booking = await Booking.update(req.body,{where: {id}});
    res.send(booking);
}));
//delete
router.delete('/booking/:id/delete',asyncHandler (async function(req,res){
    const id = req.params.id;
    const booking = await Booking.destroy({where: {id}});
    if(booking){        
        res.send([1]);
    }else{
        res.send([0]);
    }
}));
 module.exports = router;