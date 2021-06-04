const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./db');


const User = db.define('User', {
    // Model attributes are defined here
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
      },
    Tel:{
      type: DataTypes.STRING,
      allowNull:  true
    },
    Role: {
        type: DataTypes.STRING,
    },
    Code:{
      type: DataTypes.STRING,
      allowNull:  true
    },
    Verify:{
      type: DataTypes.BOOLEAN,
      allowNull:  true,
      defaultValue:false
    },
    
  });


User.ResetCode = async function(code,id){
  const user = await User.findByPk(id);
  if(user){
    if(code == user.Code){
    user.update({Code:null});
    return user;
    }
  }
}

User.findbyEmail = async function(Email){
    return User.findOne({
        where:{
            Email,
        },
    });
}

  User.findbyId = async function(id){
    return User.findByPk(id);
   }


module.exports = User;