const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
//const generateQR = require('../utils/generateQR');
const auth = require('../middlewares/auth');

//create
router.post('/ticket/add',asyncHandler (async function(req,res){
    const ticket = await Ticket.create(req.body);
    res.send(ticket);
}));

//read
router.get('/ticket',asyncHandler (async function(req,res){
    const ticket = await Ticket.findAll();
    res.send(ticket);
}));
router.get('/ticket/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const ticket = await Ticket.findByPk(id);
    res.send(ticket);
    }));

//update
router.put('/ticket/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const ticket = await Ticket.update(req.body,{where: {id}});
    res.send(ticket);
}));
//delete
router.delete('/ticket/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const ticket = await Ticket.destroy({where: {id}});
    if(ticket){        
        res.send([1]);
    }else{
        res.send([0]);
    }
}));
//Test QRCode
router.post('/ticket', async (req, res) => {
    const ticket = await Ticket.create(req.body);
  
    //const QRCode = await generateQR(`http://localhost:5000/ticket/checkin/${ticket.id}`);
    
    try {
      await ticket.save();
      res.status(201).send({ ticket});//, QRCode });
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
router.get('/ticket', async (req, res) => {
    try {
      const ticket = await Ticket.findAll();
      res.send(ticket);
    } catch (e) {
      res.status(400).send(e);
    }
  });

router.get('/ticket/checkin/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const ticket = await Ticket.findByPk(id);
      ticket.CheckIn = true;
      await ticket.save();
      return !ticket ? res.sendStatus(404) : res.send(ticket);
    } catch (e) {
      res.status(400).send(e);
    }
  });


 module.exports = router;