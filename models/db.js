const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:1@localhost:5432/Cineplex'); // Example for postgres