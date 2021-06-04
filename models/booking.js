const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');
const User = require('./user');
const ShowTime = require('./showtime');

//co the update UUID
const Booking = db.define('Booking', { 
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
    },
    DateTime:{
        type: DataTypes.DATE,
    },
    TotalPrice: {
        type: DataTypes.STRING,
    }, 
  });

User.belongsToMany(ShowTime, { through: Booking });
ShowTime.belongsToMany(User, { through: Booking });

module.exports = Booking;
