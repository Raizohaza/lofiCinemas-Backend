const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
var sequelize = require('../models/db');
// const { route } = require('./showtime');
const Ticket = require('../models/ticket');
const CheckSeat = require('../utils/CheckSeat');
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
                    const ticket = await Ticket.create(ticketData,{ transaction: t }).catch(err => {UnAvailableSeatTemp.push(Seat); console.log(err)});
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
        res.send({UnAvailableSeat: UnAvailableSeatTemp});
    } 
    
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

 module.exports = router;