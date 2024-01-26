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
  });

  //   console.log(jane);
  res.send(jane);
};

module.exports = createUser;
