const express = require('express');
const cookieParser= require('cookie-parser');
const app = express();
const dotenv= require('dotenv');
dotenv.config({path: 'config.env'})
const port = 8000;

const nodemailer= require('./middlewares/nodemailer')

3
const db = require('./database/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./middlewares/passport-local');

const passportGoogle = require('./middlewares/passport-google-oauth');
// const MongoStore = require('connect-mongo')(session);
const flash= require('connect-flash');
const customMware = require('./middlewares/flash');

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static('./static'));





// const PORT = process.env.PORT || 8000;


 // set up our view engine
 app.set('view engine', 'ejs');
 app.set ('views', './views');


app.use(session({
    name:'stuck',
    //to do -change the secret befor  in production
    secret:'blahsomething',
    resave:false,
    saveUninitialized:false,
    
    cookie: {
        maxAge: (10 * 365 * 24 * 60 * 60)
    },
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
        
    //     },
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);





app.use(flash());
app.use(customMware.setFlash);
// use express router
app.get('/',(req,res)=>{
    return res.render('home',{
        title: "home",
       
    })
})
app.use('/',require('./routes/user'));


app.listen(port,function(err){
    if(err){
        console.log(`error in running the port: ${err}`);
    }
    console.log(`server is running successfully on the port: ${port}`);
})