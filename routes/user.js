const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const EmailCtrl = require('../models/email');
const randomString = require('random-base64-string');
const brcypt = require('bcrypt');
const passport = require('passport');

router.use(function(req,res,next){
    res.locals.title = 'Log in';
    next();
})
//login
router.post('/login',asyncHandler (async function(req,res){
    try {
        const {Email,Password} = req.body;
        const found = await User.findbyEmail(Email);
        
        if(found && found.Verify !== true && brcypt.compareSync(Password,found.Password)){
            res.send(`Check your email to verify your account`);
        }
        if(found  && brcypt.compareSync(Password,found.Password)){
            req.session.UserId = found.id;
            let user={
                Email:  found.Email,
                Name:   found.Name,
                Role:   found.Role,
                Tel:    found.Tel,
                id:     found.id
            }
            res.send({user:user })

        }
        else if(found  && !brcypt.compareSync(Password,found.Password)){
            res.send('Wrong password');
        }
        else{
            res.send('Not found please register!');
        }
    } catch (error) {
        res.send(error);
    }

    }
));


router.post('/register',asyncHandler (async function(req,res){
    try {
        req.body.Code = null;
        const {Email,Password,ConfirmPassword,Role} = req.body;
        const findUser = await User.findbyEmail(Email);
         if(Password != ConfirmPassword){
          res.send('Those passwords didn’t match. Try again');
         }else if(findUser){
             res.send('Email was registered');
         }
         
         else if(!findUser){           
            let Code = randomString(4);
            let hash =  brcypt.hashSync(Password,10);            
            req.body.Password = hash;
            req.body.Code = Code;
            const found = await User.create(req.body);
            if(found){
                let host = process.env['APP_URL'] || 'https://loficinema.herokuapp.com';
                let verifyLink = `${host}/verify?id=${found.id}&code=${found.Code}`;

                EmailCtrl.send(found.Email,'Register',verifyLink);
                res.send(verifyLink);

            }else{
                res.send('Check your email to verify');
            }
         }   
    } catch (error) {
        res.send(error);
    } 
 }));
router.post('/reset',asyncHandler(async function(req, res) {
    const { Email } = req.body;
    const user = await User.findbyEmail(Email);
    const code = randomString(4);
    if(user){        
            const hash = brcypt.hashSync(code,10);
            user.Password = hash;
            user.Code = code;
            await user.save();
            const context ="Your password was changed : "+ code;
            EmailCtrl.send(Email,' reset your account ',context);        
    }
    res.send('Check your email to reset your account '+code);
}));

router.get('/verify',async(req,res,next) =>{
    let id = req.query.id;
    let code = req.query.code;
    console.log('id:',id);

    let verifyUser = await User.findByPk(id);
    if(verifyUser.Code === code){
        await verifyUser.update(
            { Verify: true },
            { where: { id: id } }
        );
        verifyUser.save().then(()=>{
            res.send({user:verifyUser});
        });
    }
    else{
        res.status(404).send('Wrong code');
    }
});

router.post('/:id/profile',asyncHandler(async function(req, res) {
    const { Name ,Tel,oldPassword,newPassword,confirmPassword} = req.body;
    //console.log({ Name ,Tel,oldPassword,newPassword,confirmPassword});
    const uid = req.params.id;  
    console.log('uid:',uid);
    const user = await User.findByPk(uid);
    if(Name){
        user.Name = Name;
    }
    if(Tel){
        user.Tel = Tel;
    }
    if(oldPassword && newPassword && confirmPassword ){
        if(brcypt.compareSync(oldPassword,user.Password)){
            if(newPassword == confirmPassword){
                const hash = brcypt.hashSync(newPassword,10);
                user.Password = hash;
                user.save();
            }else{
                res.send('new password != confirm password');
            }
        }else{
            res.send('Your old password is not correct');
        }
    }
    await user.save();
    res.send('Update success!');
}));

router.post('/:id/details',asyncHandler(async function(req, res) {
    const uid = req.params.id;  
    console.log('uid:',uid);
    const found = await User.findByPk(uid);
    if(found){
        res.send({ user : found });
    }
    else{
        res.send('Not found');
    }
}));

//login facebook
router.post('/auth/loginFacebook',(async function (req,res){
    const {Email,Name,Role,facebookId} = req.body;
    const findUser = await User.findbyEmail(Email);
    if(findUser)
        res.send('Email da dc su dung');
    else 
    {
    const user = await User.create(req.body);
    res.send(user);
    }
}));
router.post('/auth/loginGoogle',(async function (req,res){
    const {Email,Name,Role,googleId} = req.body;
    const findUser = await User.findbyEmail(Email);
    if(findUser)
        res.send('Email da dc su dung');
    else 
    {
    const user = await User.create(req.body);
    res.send(user);
    }
}));
router.get('/auth/facebook', passport.authenticate('facebook',{scope: 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook'),
  function(req, res) {
    res.send('login facebook thanh cong');
  });
//login google
router.get('/auth/google', passport.authenticate('google',{scope:[ 'profile','email' ]}));
router.get('/auth/google/callback',
  passport.authenticate('google'),
  function(req, res) {
    res.send('login google thanh cong');
  });
module.exports = router;