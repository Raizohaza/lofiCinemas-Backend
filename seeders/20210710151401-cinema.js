'use strict';
const Cineplex = require('../models/cineplex');
module.exports = {
  up: async (queryInterface, Sequelize) => {
  var cineplex =await Cineplex.findAll({raw:true,attributes:['id']});
  var newData = [];
  let listCinema = ["3D","4D","2D","HD","SD"]
  let min = 8;
  let max = 12;
  for (let i = 0; i < 10; i++) {
   let randomW = Math.floor(Math.random() * (max - min + 1)) + min;
   let randomH = Math.floor(Math.random() * (max - min + 1)) + min;
   let randomN = Math.floor(Math.random() * 11);
   let random = Math.floor(Math.random() * cineplex.length);
   const seedData = {         
      Name: "Rap chieu" +  "  " + randomN,
      Type: listCinema[Math.floor(Math.random() * listCinema.length)],
      Width: randomW,
      Height: randomH,
      createdAt: new Date(),
      updatedAt: new Date(),
      CineplexId: cineplex[random].id
   };
   newData.push(seedData);
 }
 await queryInterface.bulkInsert('Cinemas', newData);
},
  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Cineplexes', null, {});
     await queryInterface.bulkDelete('Cinemas', null, {});
  }
};
