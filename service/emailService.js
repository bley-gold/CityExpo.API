const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'blessingsx99@gmail.com', 
    pass: 'wpuk pzzj muir ylrl' 
  }
});


const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: 'blessingsx99@gmail.com',
    to: email,
    subject: 'Nexis Bank Verification OTP',
    text: `Your OTP code is: ${otp}`
  };


  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail }; 
