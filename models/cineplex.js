const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');


const Cineplex = db.define('Cineplex', {
  
    Name: {
        type: DataTypes.STRING,
      }, 
    Address:{
        type: DataTypes.TEXT,
      },
  });
  module.exports = Cineplex;