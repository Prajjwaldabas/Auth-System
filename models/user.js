

const path = require('path');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type:String,
        required : true,
    },


   firstName: {
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
       
    },
    phoneNo :{
     type: Number
    }, 
    salt:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
   
},
    {
        timestamps : true,   
    });

    

  
const User = mongoose.model('User',userSchema);
module.exports = User;
