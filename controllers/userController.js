// importing model User
const User= require('../models/user');
const crypto = require('crypto');

//rendering signup page
module.exports.signup=function(req,res){

   
    return res.render('signup',{
        title: "user signup",
       
    })

}

//rendering signin page
module.exports.signin=function(req,res){
    
    return res.render('signin',{
        title: "user_signin",
       
       
    })

}


// creating user in the db
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error','password does not match')
        return res.redirect('back');

    }


    async function findUser(user) {
        try {
          const result = await User.findOne({email: req.body.email});

          if(user){
            req.flash('error','user already exists');
            return res.redirect('back');

          }
 

           //checking password of the user valid or not
          
          if (!user){
           

            const password= req.body.password
            
            const salt = crypto.randomBytes(16).toString('hex');
            console.log("salt",salt)
            
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            console.log(hash)

            await User.create({
               firstName:req.body.firstName,
               lastName:req.body.lastName,
               email: req.body.email,
               password: hash,
               salt: salt,
               resetPasswordToken: null,
               resetPasswordExpires: null,
            })

            req.flash('success','Account has been created')
            
                        res.redirect('/signin');    
                   }
               else{
                   return res.redirect('back');
               }
        
        } catch (err) {
            req.flash('error','error in creating user exists');
            console.log(err)
            return res.redirect('back');
        }
      }
      
      findUser();
    
}



// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');
    
 
    req.session.save(() => {
        return res.redirect('/');
  
      });
      console.log('flash login msg sent');
    
}



module.exports.destroySession = function(req, res,next){
    // req.logout();
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        req.flash('success','You have logged out successfully');
        console.log('flash logout msg sent');
        res.redirect('/signin');

    });
      };

   

///......................................

    // // steps to authenticate manually
    // // find the user
    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing in'); return}
    //     // handle user found
    //     if (user){

    //         // handle password which doesn't match
    //         if (user.password != req.body.password){
                
    //             return res.redirect('back');
    //         }

    //         // handle session creation
    //         res.cookie('user_id', user.id);
    //         return res.redirect('/users/profile');

    //     }else{
    //         // handle user not found

    //         return res.redirect('back');
    //     }


    // });  

