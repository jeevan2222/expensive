const sequelize = require("../dbconnection/db");
const User = require("../schema/userTable");
const jwt = require("jsonwebtoken");
const sendEmailVerificationCode = require("../utils/sendmail");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  const verificationCode = await sendEmailVerificationCode(email, otp);
  console.log("ver>>>>>>>>>>>>>>", verificationCode);

  const jane = await User.create({
    name: name,
    email: email,
    password: password,
    otp: otp,
    isemailverified: false,
  });

  res.send(jane);
};

const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user === null) {
    res.send({
      status: 401,
      error: true,
      message: "Invalid email address",
    });
  } else {
    if (user.otp == otp) {
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
        message: "Email verification successful",
      });
    } else {
      res.send({
        status: 403,
        error: true,
        message: "OTP does not match",
      });
    }
  }
};

const addBill = async (req, res) => {
  const { email, addbill } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user === null) {
    res.send({
      status: 401,
      error: true,
      message: "Invalid email address",
    });
  } else {
    await User.update(
      { totol_money: addbill },
      {
        where: {
          email: email,
        },
      }
    );

    res.send({
      status: 200,
      error: false,
      message: "Bill added successfully",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findOne({ where: { email: email } });
    if (user) {
      let token = jwt.sign({ email: email }, "shhhhh");
      console.log("token>>>>>>>>>>>", token);
      res.send({
        error: false,
        message: "User login Success",
        access_token: token,
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const dashboard = async (req, res) => {
  const { userid, email } = req.body;
  res.send("Hi Im From DashBoard");
};

module.exports = { createUser, verifyEmail, addBill, loginUser, dashboard };
