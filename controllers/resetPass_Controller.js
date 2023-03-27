
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User= require('../models/user');

// function to send reset link on mail
module.exports.sendlink = async(req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
        return req.flash('error',"User not found")
    //   return res.status(400).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // Token expires in 24 hours

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiresAt;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'Prajjwalchaudhary29898@gmail.com',
        pass: 'vhntgvyfsaqijzee'
      }
    });

    const mailOptions = {
      to: email,
      from: 'Prajjwalchaudhary29898@gmail.com',
      subject: 'Password Reset Request',
      html: `   
      <p>Hello,</p>
      <p>You are receiving this email because you (or someone else) has requested a password reset. Please click on the following link, or paste this into your browser to complete the process:</p>
      <p><a href="http://${req.headers.host}/reset-password/${token}">Reset Password</a></p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <b>Best regards,<br>Stuck Team</b>`

    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      req.flash('success','Reset password link has been sent to your registered email')
      res.redirect('/signin')
      
    //   res.status(200).json({ message: 'Email sent' });
     
    });
  } catch (err) {
    console.error(err);
    req.flash('error','Email sent Successfully')

    // res.status(500).json({ message: 'Failed to reset password' });
  }
};

// function to render reset form 
module.exports.resetForm= async(req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
          req.flash('error','Invalid or expired token')
    //   return res.status(400).json({ message: 'Invalid or expired token' });
      
    }

    res.render('reset-password', { token: req.params.token  },);
   

  } catch (err) {
    console.error(err);
      req.flash('error','Failed to display password reset form')
    res.status(500).json({ message: 'Failed to display password reset form' });
  }
};

// Route for submitting the new password
module.exports.submitPass= async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
          req.flash('error','Invalid or expired token')
       res.status(400).json({ message: 'Invalid or expired token' });
    
    }

    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
   
     
    // res.status(200).json({ message: 'Password updated successfully' });
    req.flash('success','Password updated Successfully');
    res.redirect('/signin')
    
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update password' });
  }
};


