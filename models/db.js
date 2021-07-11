const { Sequelize, DataTypes, Model } = require('sequelize');
if (process.env.DATABASE_URL !== undefined)
{
    module.exports = new Sequelize(process.env.DATABASE_URL ,{
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
            rejectUnauthorized: false,
            }
        }
    });
}
else{
    module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:1@localhost:5432/Cineplex'); // Example for postgres
}
