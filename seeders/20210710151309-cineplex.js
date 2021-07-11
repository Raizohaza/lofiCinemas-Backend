'use strict';
var faker = require("faker");
const { random } = require("../models/db");
module.exports = {
  up: async (queryInterface, Sequelize) => {

     var newData = [];
     const nameCinema = ["Cgv", "Galaxy", "Cinestar"];
     
     for (let i = 0; i < 10; i++) {
      let random = Math.floor(Math.random() * nameCinema.length);
      const seedData = {         
          Name: faker.address.streetName() +  "  " + nameCinema[random],
          Address: faker.address.streetAddress() +  "," + faker.address.city() + "," + faker.address.country(),
          createdAt: new Date(),
          updatedAt: new Date()
      };
      newData.push(seedData);
    }
    await queryInterface.bulkInsert('Cineplexes', newData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cineplexes', null, {});
  }
};
