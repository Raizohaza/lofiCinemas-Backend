const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');
const Cineplex = require('./cineplex');
  
const Cinema = db.define('Cinema', {
  
  Name: {
    type: DataTypes.STRING,
  }, 
  Type:{
      type: DataTypes.STRING,
    },
  Width:{
      type: DataTypes.INTEGER,
  },
  Height:{
      type: DataTypes.INTEGER,
  },

});

Cinema.belongsTo(Cineplex,{onUpdate: 'CASCADE',onDelete: 'CASCADE',});
Cineplex.hasMany(Cinema,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'});


module.exports = Cinema;