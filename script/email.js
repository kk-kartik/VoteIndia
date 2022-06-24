
function ss(){

    var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vote.india.kk@gmail.com',
    pass: '1234poiu'
  }
});

var mailOptions = {
  from: 'vote.india.kk@gmail.com',
  to: sessionStorage.getItem('email'),
  subject: sessionStorage.getItem('VID')+"- Your Unique Voter Id",
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}
        