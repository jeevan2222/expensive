const nodemailer = require("nodemailer");
const sendEmailVerificationCode = (email, otp = null, next = null) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jeevantest64@gmail.com",
      pass: "aora lfje anli ajnp",
    },
  });
  const mailOptions = {
    from: "jeevantest64@gmail.com", 
    to: email, 
  };
  if (otp) {
    mailOptions.subject = "Email Verification Code";
    mailOptions.html = `<p>Your OTP   <b>${otp} </b></p>`;
  } else {
    mailOptions.link = "http//localhost:1234";
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err){
      return{
      error: 502,
      message:"Bad Gateway"
      }
    } 
    else {
      console.log("email sent successfully");
      next();
    }
  });
};

module.exports = sendEmailVerificationCode;
