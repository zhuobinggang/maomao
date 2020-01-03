var nodemailer = require('nodemailer');
const config = require('./mail.config')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass, 
  }
});

function sendEmail(to, subject, content){
  transporter.sendMail({
    from: config.user,
    to,
    subject,
    text: content,
  }, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


module.exports = {
  sendEmail
}