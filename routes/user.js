const express = require('express');
const router = express.Router();
const passport=require('passport');
const userController = require('../controllers/userController');
const reserPassController= require('../controllers/resetPass_Controller');
const { reset } = require('nodemon');

router.get('/signup',userController.signup );
router.get('/signin',userController.signin );

router.post('/create',userController.create);




// //passport authentication route
 router.post('/create-session',
 passport.authenticate('local',{ failureRedirect: '/signin' },)
,userController.createSession);


router.get('/sign-out', userController.destroySession);
module.exports = router;

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/signin'}),userController.createSession);


router.post('/reset-password',reserPassController.sendlink)

router.get('/reset-password/:token',reserPassController.resetForm)

router.post('/reset-password/:token',reserPassController.submitPass)

router.get('/forgot-password',(req,res)=>{
    res.render('forgotPass')
})




module.exports = router;