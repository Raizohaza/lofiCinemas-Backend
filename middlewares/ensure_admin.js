module.exports = function ensureadmin(req , res , next){
    const user = req.user;
    if(!user || user.Role != 'admin'){
        res.redirect('/home');
    }else {
     next();
    }
 };