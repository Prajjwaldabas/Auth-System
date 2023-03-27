const nodemailer = require('nodemailer');

function sendMail(from, to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'prajjwalchaudhary29898@gmail.com',
        pass: 'vhntgvyfsaqijzee'
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
