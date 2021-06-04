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
        if(found && brcypt.compareSync(Password,found.Password)){
            req.session.UserId = found.id;
            if(found.Role == 'admin'){
                //res.redirect('/admin');
                res.send({user:found })
            }else{
                //res.redirect('/home');
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
        const {Email,Password,Confirmpassword,Role} = req.body;
        const finduser = await User.findbyEmail(Email);
         if(Password != Confirmpassword){
          res.send('Those passwords didn’t match. Try again');
         }else if(finduser){
             res.send('Email da dc su dung');
         }
         
         else if(!finduser){           
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
                //const context ="To register click here : localhost:5000/send?code="+found.Code+"&userid="+found.id;
                EmailCtrl.send(found.Email,'Register',verifyLink);
                res.send(`Check your email to vertify your account`+verifyLink);
                }else{
                    res.send('Xác thực mail');
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
    res.send('Check your email to reset your account'+code);
}));

router.get('/verify',async(req,res,next) =>{
    let id = req.query.id;
    let code = req.query.code;
    console.log('id:',id);
    //User.findById(id);
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
        res.send('Sai code');
    }
});

router.post('/profile',asyncHandler(async function(req, res) {
    const { Name ,Tel,oldpassword,newpassword,confirmpassword} = req.body;
    console.log({ Name ,Tel,oldpassword,newpassword,confirmpassword});
    const user = req.user;
    if(Name){
        user.Name = Name;
    }
    if(Tel){
        user.Tel = Tel;
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
    res.send('update thanh cong');
}));
module.exports = router;