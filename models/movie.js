const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');


const Movie = db.define('Movie', {
  
    Name: {
        type: DataTypes.STRING,
      }, 
    ReleaseDate:{
        type: DataTypes.DATEONLY,
      },
    Poster:{
        type: DataTypes.STRING,
      },
    Duration:{
        type: DataTypes.INTEGER,
    },
    Decription:{
        type: DataTypes.TEXT,
    },
    Genres:{
        type: DataTypes.STRING,
    },
    MID:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Status:{
      type: DataTypes.STRING,
    },
    Trailer:{
      type: DataTypes.STRING,
    },
  });

  module.exports=Movie;