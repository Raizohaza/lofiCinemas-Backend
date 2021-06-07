const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const EmailCtrl = require('../models/email');
const randomString = require('random-base64-string');
const brcypt = require('bcrypt');

router.use(function(req,res,next){
    res.locals.title = 'Log in';
    next();
})
//login
router.post('/login',asyncHandler (async function(req,res){
    try {
        const {Email,Password} = req.body;
        const found = await User.findbyEmail(Email);

        if(found.Verify !== true){
            res.send(`Check your email to verify your account`);
        }
        else if(found  && brcypt.compareSync(Password,found.Password)){
            req.session.UserId = found.id;

            if(found.Role == 'admin'){
                res.send({user:found })
            }else{
                res.send({user:found })
            }
        }
        else{
            res.send('Wrong password');
        }
    } catch (error) {
        res.sendStatus(406);
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
             res.send('Email da dc su dung');
         }
         
         else if(!findUser){           
            let Code = randomString(4);
            let hash =  brcypt.hashSync(Password,10);            
            req.body.Password = hash;
            req.body.Code = Code;
            const found = await User.create(req.body);
            if(found){
                let host = req.hostname;
                if(host == 'localhost')
                    host = 'http://localhost:5000';
                let verifyLink = `${host}/user/verify?id=${found.id}&code=${found.Code}`;

                EmailCtrl.send(found.Email,'Register',verifyLink);
                res.send(`Check your email to verify your account ` + verifyLink);

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
            res.send({User:verifyUser});
        });
    }
    else{
        res.send('Wrong code');
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
module.exports = router;