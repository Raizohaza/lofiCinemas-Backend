const ShowTime = require('../models/showtime');
const Booking = require('../models/booking');
const Cinema = require('../models/cinema');
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

async function StatisticMovie(MovieId){
    const showTimes = await ShowTime.findAll({where: {MovieId},raw: true,order:[['DateShow']] });
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
async function StatisticCinema(CinemaId){
    const showTimes = await ShowTime.findAll({where: {CinemaId},raw: true,order:[['DateShow']] });
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
StatisticCinema(1);
module.exports ={StatisticMovie,StatisticCinema};