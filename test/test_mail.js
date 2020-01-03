var nodemailer = require('nodemailer');
const config = require('../mail.config')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass, 
  }
});

var mailOptions = {
  from: 'zhuobinggang@gmail.com',
  to: '1031908624@qq.com, zhuobinggang@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});