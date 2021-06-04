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
        type: DataTypes.BLOB,
      },
    Duration:{
        type: DataTypes.INTEGER,
    },
    Decription:{
        type: DataTypes.TEXT,
    },
    Category:{
        type: DataTypes.STRING,
    },
  });

  module.exports=Movie;