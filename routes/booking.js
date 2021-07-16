const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
var sequelize = require('../models/db');
// const { route } = require('./showtime');
const Ticket = require('../models/ticket');
const {CheckSeat,AvailableSeat} = require('../utils/CheckSeat');
//const generateQR = require('../utils/generateQR');
//create
// data List Seat + List Price + BookingId + DateTime  + Total Price
router.post('/booking/add',asyncHandler (
/**
 * 
 * @param {*} req (List Seats[] + Price[] + UserId + ShowTimeId)
 * @param {*} res 
 */
async function(req,res){
    let UnAvailableSeatTemp = [];
    try {
        const result = await sequelize.transaction(async (t) => {
            const booking = await Booking.create(req.body,{ transaction: t });
            //console.log(booking);
            let TotalPrice = 0;
            let BookingId = booking.id;
            let ShowTimeId = booking.ShowTimeId;
            let {AvailableSeat,UnAvailableSeat} = await CheckSeat(req.body.Seats,ShowTimeId);
            UnAvailableSeatTemp = UnAvailableSeat;
            for(var element in req.body.Seats) {
                let Seat = req.body.Seats[element];
                if(AvailableSeat.includes(Seat)){
                    let Price = req.body.Price[element];
                    let ticketData = {Seat: Seat , Price : Price, BookingId : BookingId, ShowTimeId:ShowTimeId };        
                    const ticket = await Ticket.create(ticketData,{ transaction: t }).catch(err => {UnAvailableSeatTemp.push(err); console.log(err)});
                    TotalPrice += ticket.Price;
                }
            };   
            let dt = new Date();
            await dt.setHours(dt.getHours()+7);
            booking.DateTime = dt;
            booking.TotalPrice = TotalPrice.toFixed(2);   
            booking.save();
            res.send({booking, UnAvailableSeat});
        });
    } catch (error) {
        //await t.rollback();
        res.send({UnAvailableSeat: UnAvailableSeatTemp}+error);
    } 
    
}));
//read
// router.post('/booking',asyncHandler (async function(req,res){
//     const booking = await Booking.findAll();
//     res.send(booking);
// }));
router.get('/booking/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const booking = await Booking.findByPk(id);
    res.send(booking);
    }));

//update
router.put('/booking/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    let {AvailableSeat,UnAvailableSeat} = await CheckSeat(req.body.Seats,ShowTimeId);
    const booking = await Booking.update(req.body,{where: {id}});
    res.send(booking);
}));
//delete
router.delete('/booking/:id',asyncHandler (async function(req,res){
    const id = req.params.id;
    const booking = await Booking.destroy({where: {id}});
    if(booking){        
        res.send([1]);
    }else{
        res.send([0]);
    }
}));
//QRcode

router.post('/booking', async (req, res) => {
    const booking = await Booking.create(req.body);
  
    //const QRCode = await generateQR(`http://localhost:5000/booking/checkin/${booking.id}`);
    
    try {
      await booking.save();
      res.status(201).send({ booking });//, QRCode
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
router.get('/booking', async (req, res) => {
    try {
      const booking = await Booking.findAll();
      res.send(booking);
    } catch (e) {
      res.status(400).send(e);
    }
  });

router.get('/booking/checkin/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const booking = await Booking.findByPk(id);
      ticket.CheckIn = true;
      await booking.save();
      return !booking ? res.sendStatus(404) : res.send(booking);
    } catch (e) {
      res.status(400).send(e);
    }
  });
//Cinema Seat
router.post('/booking/:id/cinemaseat',asyncHandler (async function(req,res){
    const id = req.params.id;
    const cinemaseat = await AvailableSeat(id);
    res.send(cinemaseat);
}));

 module.exports = router;