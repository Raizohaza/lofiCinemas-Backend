const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');
const Booking = require('./booking');
const ShowTime = require('./showtime');

const Ticket = db.define('Ticket', {
  
    Seat: {
        type: DataTypes.STRING,
      }, 
    
    Price:{
        type: DataTypes.DOUBLE,
      },
    ShowTimeId:{
        type: DataTypes.INTEGER,
      },
    CheckIn:{
        type: DataTypes.BOOLEAN,
      }
  },
  {
    uniqueKeys: {
        Items_unique: {
            fields: ['Seat', 'ShowTimeId']
        }
    }
  }
  );
ShowTime.hasMany(Ticket, {
  onDelete: 'CASCADE ',
  onUpdate: 'CASCADE '
});

Booking.hasMany(Ticket, {
  onDelete: 'CASCADE ',
  onUpdate: 'CASCADE '
});

module.exports = Ticket;