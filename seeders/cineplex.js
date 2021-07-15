'use strict';
var faker = require("faker");
const Cineplex = require("../models/cineplex");
const { random } = require("../models/db");
function CreateCineplex()
{
  //reformat obj to model movie
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
  //update / insert 
  //console.log(newData);
  Cineplex.bulkCreate(newData);
}
CreateCineplex();