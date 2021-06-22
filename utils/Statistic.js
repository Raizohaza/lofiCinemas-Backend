const ShowTime = require('../models/showtime');
const Booking = require('../models/booking');
const Cinema = require('../models/cinema');
const {Op} = require('sequelize');
async function SumMoney(ShowTimeId){
    const bookings = await Booking.findAll({where: {ShowTimeId},raw: true});
    let Total = 0;
    for (const booking of bookings) {
        Total += Number.parseFloat(booking.TotalPrice);        
    }
    return Total;
};

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = {total : obj.total};
      }
      else{
        acc[key].total += Number.parseFloat(obj.total);
      }
      return acc
    }, {})
  }

async function StatisticMovie(MovieId,startDate,endDate){
    const showTimes = await ShowTime.findAll({where: {MovieId, DateShow: {[Op.between]:[startDate,endDate]}},raw: true,order:[['DateShow']] });
    let totalArray = [];
    let temp = [];
    for (const showTime of showTimes) {
        let money = await SumMoney(showTime.id);
        temp.push({
            total: money,
            date: showTime.DateShow
        });        
    }
    temp = groupBy(temp , 'date');
    return temp;
};
async function StatisticCinema(CinemaId,startDate,endDate){
    const showTimes = await ShowTime.findAll({where: {CinemaId, DateShow: {[Op.between]:[startDate,endDate]}},raw: true,order:[['DateShow']] });
    let totalArray = [];
    let temp = [];
    for (const showTime of showTimes) {
        let money = await SumMoney(showTime.id);
        temp.push({
            total: money,
            date: showTime.DateShow
        });        
    }
      
    temp = groupBy(temp , 'date');
    console.log(temp);
    return temp;
};
StatisticCinema(1,'2000-12-20','2000-12-25');

module.exports ={StatisticMovie,StatisticCinema};