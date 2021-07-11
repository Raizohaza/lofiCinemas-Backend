// const jwt = require('jsonwebtoken');
// function jwtAuth(id){
//   const token = jwt.sign({ id }, 'mySecret');
//   console.log(token);
//   const decoded = jwt.verify(token, 'mySecret');
//   console.log(decoded);
// };

// jwtAuth(23);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const { Sequelize, DataTypes,QueryTypes } = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const queryInterface = sequelize.getQueryInterface();
const Cineplex = require('./models/cineplex');
async function test (queryInterface, Sequelize){
  var cineplex =await Cineplex.findAll({raw:true,attributes:['id']});
  console.log(cineplex);
}
test(queryInterface,Sequelize);