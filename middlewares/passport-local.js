const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sendMail = require('../middlewares/nodemailer');
const User= require('../models/user')
const crypto = require('crypto');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
},
function(req,email, password, done){
    // find a user and establish the identity

    
    User.findOne({email: email})
  .then((user,err) => {
    if (err){
        req.flash('error',"Error creating in user");
        return done(err);
    }

    const salt = user.salt;
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');

if (hash !== user.password) {
    req.flash('error','Invalid Username/Password');
        return done(null, false);
}
    sendMail('prajjwalchaudhary29898@gmail.com' ,`${user.email}`, 'Welcome to Stuck', `Dear ${user.firstName},

    Welcome to Stuck! We're excited to have you as a new member of our community.
    
    If you need any assistance getting started, feel free to reach out to us at any time. We're here to help you have the best experience possible with our products and services.
    
    Best regards,
   Prajjwal Chaudhary
    Stuck Team.`);
    return done(null, user);
  })
  .catch((err) => {
    console.error(err);
  });

}






));
// // serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// // deserialsizing the user from the key in the cookies
passport.deserializeUser(function(id,done){

    User.findById().then((user,err) => {
        if(err){
            console.log('error in finding the user-->passport')
        return done(err);
           }
           
           return done(null,user);
      })
      .catch((err) => {
        console.error(err);
      });
    })



passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}
module.exports=passport;