const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');
const User = require('./user');
const ShowTime = require('./showtime');

//co the update UUID
const Booking = db.define('Booking', { 
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    DateTime:{
        type: DataTypes.DATE,
    },
    TotalPrice: {
        type: DataTypes.DOUBLE,
    },
  });

User.hasMany(Booking);
ShowTime.hasMany(Booking);

module.exports = Booking;
