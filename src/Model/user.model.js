const sequelize = require("../dbconnection/db");

const User = require("../schema/userTable");
const sendEmailVerificationCode = require("../utils/sendmail");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  const VerificationCode = await sendEmailVerificationCode(email, otp);
  console.log("ver>>>>>>>>>>>>>>", VerificationCode);

  const jane = await User.create({
    name: name,
    email: email,
    password: password,
    otp: otp,
    isemailverified: false,
  });

  //   console.log(jane);
  res.send(jane);
};
const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const project = await User.findOne({ where: { email: email } });
  if (project === null) {
    res.send({
      status: 401,
      error: true,
      message: "send valid mail id",
    });
  } else {
    if (project.otp == otp) {
      await User.update(
        { isemailverified: true, otp: null },
        {
          where: {
            email: email,
          },
        }
      );
      res.send({
        status: 201,
        error: false,
        message: "email  verification done",
      });
    } else {
      res.send({
        status: 403,
        error: true,
        message: "otp not matched",
      });
    }
  }
};
module.exports = { createUser, verifyEmail };
