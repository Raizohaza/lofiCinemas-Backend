const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');
const Booking = require('./booking');

const Ticket = db.define('Ticket', {
  
    Seat: {
        type: DataTypes.STRING,
      }, 
    
    Price:{
        type: DataTypes.INTEGER,
      },
    ShowTimeId:{
        type: DataTypes.INTEGER,
      },

  },
  {
    uniqueKeys: {
        Items_unique: {
            fields: ['Seat', 'ShowTimeId']
        }
    }
  }
  );
  

    // 1 todo chi co 1 user con 1 user co nhiu todo
Ticket.belongsTo(Booking);
Booking.hasMany(Ticket);

module.exports = Ticket;