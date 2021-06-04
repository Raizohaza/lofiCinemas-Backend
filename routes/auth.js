const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const brcypt = require('bcrypt');
const User = require('../models/user');
const ensureloggin = require('../middlewares/ensure_login');
router.use(ensureloggin);
router.use(function(req,res,next){
    const user = req.user;
    res.locals.title = user.Name;
    next();
});


router.post('/',asyncHandler(async function(req, res) {
    const { name ,tel,oldpassword,newpassword,confirmpassword} = req.body;
    const user = req.user;
    if(name){
        user.Name = name;
    }
    if(tel){
        user.Tel = tel;
    }
    if(oldpassword && newpassword && confirmpassword ){
        if(brcypt.compareSync(oldpassword,user.Password)){
            if(newpassword == confirmpassword){
                const hash = brcypt.hashSync(newpassword,10);
                user.Password = hash;
                user.save();
            }else{
                res.send('new password != confirm password');
            }
        }else{
            res.send('your old password is not conrrect');
        }
    }
    await user.save();
    res.redirect('/home');
}));

//logout
router.get('/logout',function(req,res){
    delete req.session.UserId ;
    res.redirect('/home');
});
module.exports = router;