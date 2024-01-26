const nodemailer = require("nodemailer");

const sendEmailVerificationCode = (email, otp, next) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jeevantest64@gmail.com",
      pass: "aora lfje anli ajnp",
    },
  });

  const mailOptions = {
    from: "jeevantest64@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Email Verification Code", // Subject line
    html: `<p>Your html here${otp} </p>`, // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else {
      console.log("email sent successfully"), next();
    }
  });
};
module.exports = sendEmailVerificationCode;
