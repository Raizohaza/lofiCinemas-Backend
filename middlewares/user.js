const Users = require('../models/user');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler( async function user(req , res , next){
    const { UserId } = req.session;
    res.locals.currentUser = null;
    if(UserId){
        const user = await Users.findbyId(UserId)
        if(user){
            req.user = user;
            res.locals.currentUser = user;
        }
            next();
    }else{
        next();
    }
});