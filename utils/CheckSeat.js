const ShowTime = require('../models/showtime');
const Cinema = require('../models/cinema');
const Ticket = require('../models/ticket');
async function GetShowTimeSeat(ShowTimeId){
    const showTime = await ShowTime.findByPk(ShowTimeId);
    let CinemaId = showTime.CinemaId;
    const cinema = await Cinema.findByPk(CinemaId);
    const ticket = await Ticket.findAll({where:{ShowTimeId:ShowTimeId},raw:true,attributes:['Seat']});
    let bookedSeat = ticket.map(tic => tic.Seat);
    let Height = cinema.Height;
    let Width = cinema.Width;
    let CinemaSeat = [];
    for (let index = 0; index < Height; index++) {
        let SeatChar = String.fromCharCode(65+index);
        for (let j = 0; j < Width; j++) {
            const element = SeatChar + (j + 1);
            if( ! bookedSeat.includes(element))
                CinemaSeat.push(element);      
        }
    }
    return CinemaSeat;
}
async function GetCinemaSeat(CinemaId){
    const cinema = await Cinema.findByPk(CinemaId);
    const ticket = await Ticket.findAll({where:{ShowTimeId:ShowTimeId},raw:true,attributes:['Seat']});
    let bookedSeat = ticket.map(tic => tic.Seat);
    let Height = cinema.Height;
    let Width = cinema.Width;
    let CinemaSeat = [];
    for (let index = 0; index < Height; index++) {
        let SeatChar = String.fromCharCode(65+index);
        for (let j = 0; j < Width; j++) {
            const element = SeatChar + (j + 1);
            if( ! bookedSeat.includes(element))
                CinemaSeat.push(element);      
        }
    }
    return CinemaSeat;
}
/**
 * 
 * @param {Array} Seats Seat List
 * @param {number} ShowTimeId 
 * @returns 
 */
async function CheckSeat(Seats,ShowTimeId){

    let CinemaSeat = await GetCinemaSeat(ShowTimeId);
    let AvailableSeat = [];
    let UnAvailableSeat = [];

    for (const seat in Seats) {
        if (Object.hasOwnProperty.call(Seats, seat)) {
            const element = Seats[seat].toUpperCase();
            if(CinemaSeat.includes(element))
                AvailableSeat.push(element);
            else
                UnAvailableSeat.push(element);
        }
    }
    console.log( {AvailableSeat: AvailableSeat,UnAvailableSeat: UnAvailableSeat});
    return {AvailableSeat: AvailableSeat,UnAvailableSeat: UnAvailableSeat};
}

CheckSeat(['H1','A1','A2','A3'],5);
module.exports ={ CheckSeat,GetCinemaSeat,GetShowTimeSeat};