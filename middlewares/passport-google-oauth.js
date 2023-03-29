const passport = require('passport');
const googleStratgy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const sendMail = require('../middlewares/nodemailer');
require('dotenv').config();


passport.use(new googleStratgy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://localhost:8000/auth/google/callback",

},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).then((user)=>{
            if (user) {
                
                return done(null, user);

            }
            else {
                User.create({
                    firstName: profile.displayName,
                    lastName: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }).then((user)=>{
                    sendMail('prajjwalchaudhary29898@gmail.com' ,`${user.email}`, 'Welcome to Stuck', `Dear ${user.firstName},
                    Welcome to Stuck! We're excited to have you as a new member of our community.
                    If you need any assistance getting started, feel free to reach out to us at any time. We're here to help you have the best experience possible with our products and services.
                    
                    Best regards,
                   Prajjwal Chaudhary
                    Stuck Team.`);
                    return done(null, user);
                   
                }).catch((err)=>{
                    console.error(err)
                })
        }
    }).catch((err)=>{
        console.error(err)
    })
      
        })
    
)