const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

//create
router.post('/ticket/add',asyncHandler (async function(req,res){
    const ticket = await Ticket.create(req.body);
    res.send(ticket);
}));

//read
router.post('/ticket',asyncHandler (async function(req,res){
    const ticket = await Ticket.findAll();
    res.send(ticket);
}));
router.post('/ticket/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const ticket = await Ticket.findByPk(id);
    res.send(ticket);
    }));

//update
router.post('/ticket/:id/update',asyncHandler (async function(req,res){
    const id = req.params.id;
    const ticket = await Ticket.update(req.body,{where: {id}});
    res.send(ticket);
}));
//delete
router.delete('/ticket/:id/delete',asyncHandler (async function(req,res){
    const id = req.params.id;
    const ticket = await Ticket.destroy({where: {id}});
    if(ticket){        
        res.send([1]);
    }else{
        res.send([0]);
    }
}));

 module.exports = router;