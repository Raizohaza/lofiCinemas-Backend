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
      type: DataTypes.STRING,
  },
});

Cinema.belongsTo(Cineplex);
Cineplex.hasMany(Cinema);

module.exports = Cinema;