const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');
const Cinema = require('./cinema');
const Movie = require('./movie');

const ShowTime = db.define('ShowTime', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    TimeBegin: {
        type: DataTypes.TIME,
    }, 
    DateShow:{
      type: DataTypes.DATEONLY,
    },
    Price:{
        type: DataTypes.INTEGER,
    },
    MovieId:{
      type: DataTypes.INTEGER,
    },
    CinemaId:{
      type: DataTypes.INTEGER,
    },
       
},
// {
//   indexes: [
//       {
//           unique: true,
//           fields: ['id', 'TimeBegin', 'DateShow','MovieId','CinemaId']
//       }
//   ]
// }
{
  uniqueKeys: {
      Items_unique: {
        fields: [ 'TimeBegin', 'DateShow','CinemaId']
      }
  }
}
);
ShowTime.belongsTo(Movie,{
  foreignKey: 'MovieId'}
);
ShowTime.belongsTo(Cinema,{
  foreignKey: 'CinemaId'
  });
module.exports = ShowTime;

