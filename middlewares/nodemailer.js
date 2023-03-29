require('dotenv').config();

const nodemailer = require('nodemailer');
// Require the dotenv library


// Use the GMAIL_PASSWORD environment variable in your code
const password = process.env.GMAIL_PASSWORD;
// console.log(`My Google Mail Service password is ${password}`);




function sendMail(from, to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'prajjwalchaudhary29898@gmail.com',
        pass: password
    }
  });

  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail;
