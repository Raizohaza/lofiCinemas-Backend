const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
var sequelize = require('../models/db');
const Ticket = require('../models/ticket');
const {CheckSeat, GetShowTimeSeat} = require('../utils/CheckSeat');
const ShowTime = require('../models/showtime');
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
            let {AvailableSeat,UnAvailableSeat} = await CheckSeat(req.body.Seats,req.body.ShowTimeId);

            UnAvailableSeatTemp = UnAvailableSeat;
            if(UnAvailableSeat.length === 0){
              await sequelize.transaction(async (t) => {
                const booking = await Booking.create(req.body,{ transaction: t });
                let TotalPrice = 0;
                let BookingId = booking.id;
                let ShowTimeId = booking.ShowTimeId;

                for(var element in req.body.Seats) {
                  let Seat = req.body.Seats[element];
                  if(AvailableSeat.includes(Seat)){
                      let Price = req.body.Price[element];
                      let ticketData = {Seat: Seat , Price : Price, BookingId : BookingId, ShowTimeId:ShowTimeId };        
                      await Ticket.create(ticketData,{ transaction: t }).then((response)=>
                      {
                        TotalPrice += response.Price;
                      }).catch(err => {UnAvailableSeatTemp.push(Seat);});
                  }
                };   
                let dt = new Date();
                await dt.setHours(dt.getHours()+7);
                booking.DateTime = dt;
                booking.TotalPrice = TotalPrice.toFixed(2);   
                booking.save();
                res.send({booking});//{booking, UnAvailableSeat}
              });
            }
            else{
              //res.send({UnAvailableSeat});
              throw new Error();
            }
    } catch (error) {
        res.send({UnAvailableSeat: UnAvailableSeatTemp,error:error});
    } 
    
}));
//read
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

  router.get('/booking/movieId/:id', async (req, res) => {
      const id = req.params.id;
      const showTimes = await ShowTime.findAll({include: { model: Booking },where:{MovieId:id}});
      let numOr0 = n => isNaN(n) ? 0 : n
      let revenue = showTimes.map(
        showTime =>{
          let total = showTime.Bookings.reduce((a, b) => 
              numOr0(a.TotalPrice) + numOr0(b.TotalPrice))
          return{total,showTimeId:showTime.id}
        } 
          
      );

      res.send(showTimes);
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

module.exports = router;