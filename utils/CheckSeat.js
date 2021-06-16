const ShowTime = require('../models/showtime');
const Cinema = require('../models/cinema');
/**
 * 
 * @param {Array} Seats Seat List
 * @param {number} ShowTimeId 
 * @returns 
 */
async function CheckSeat(Seats,ShowTimeId){
    const showTime = await ShowTime.findByPk(ShowTimeId);
    let CinemaId = showTime.CinemaId;
    const cinema = await Cinema.findByPk(CinemaId);
    let Height = cinema.Height;
    let Width = cinema.Width;
    let CinemaSeat = [];
    let AvailableSeat = [];
    let UnAvailableSeat = [];
    for (let index = 0; index < Height; index++) {
        let SeatChar = String.fromCharCode(65+index);
        for (let j = 0; j < Width; j++) {
            const element = SeatChar + (j + 1);
            CinemaSeat.push(element);      
        }
    }
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

module.exports = CheckSeat;