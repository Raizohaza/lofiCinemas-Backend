const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');
const Cinema = require('./cinema');
const Movie = require('./movie');

const ShowTime = db.define('ShowTime', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    TimeBegin: {
        type: DataTypes.TIME,
        primaryKey:true,
    }, 
    DateShow:{
      type: DataTypes.DATEONLY,
      primaryKey:true,
    },
    Price:{
        type: DataTypes.INTEGER,
    },
    MovieId:{
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    CinemaId:{
      type: DataTypes.INTEGER,
      primaryKey:true
    }   
});
ShowTime.belongsTo(Movie,{
  foreignKey: 'MovieId'}
);
ShowTime.belongsTo(Cinema,{
  foreignKey: 'CinemaId'
  });
module.exports = ShowTime;

