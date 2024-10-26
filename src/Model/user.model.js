const sequelize = require("../dbconnection/db");
const User = require("../schema/userTable");
const Group = require("../schema/groupTable");
const MoneyData=require("../schema/amountTrack");
const jwt = require("jsonwebtoken");
const sendEmailVerificationCode = require("../utils/sendmail");

const createUser = async (req, res) => {
try {
  const { name, email, password,role } = req.body;
  console.log(name,email,password,role);
  if (!name && !email && !password && !role )  {
    res.send({
      error: 400,
      message: "Bad Request",
    });
  }
  const otp = Math.floor(1000 + Math.random() * 9000);
  const jane = await User.create({
    name: name,
    email: email,
    password: password,
    otp: otp,
    role:role,
    isemailverified: false,
  });
  await sendEmailVerificationCode(email, otp);
  res.send(jane);
} catch (error) {
  console.log("errror",error)
  res.send({
    error: 500,
    message: "Internal Server Error"
  })
}
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
    console.log(">>>>>>>", req.body);
    const { email, password, role } = req.body;

    const user = await User.findOne({ where: { email: email } });
    console.log("user>>>>>>>>>>>>>>>>>>>", user);
    // Verify password

    console.log("password",user?.dataValues.password)
    const passwordValid = user?.dataValues.password===password;
    if (!passwordValid) {
        return res.status(404).json(
         { status:404,
          message:'Incorrect  password'
        })
      }
    if (user?.dataValues) {
      res.send({
        error: 201,
        message: "User login Success",
      });
    }else
    res.send({
      error: 404,
      message: "User Not Found",
    })
  } catch (error) {
    res.send(error);
  }
};

const dashboard = async (req, res) => {
  try {
    const { user } = req.body;
    const { id } = user;

    const dashboardDetails = await User.findAll({
      where: { id: id },
      include: [
        {
          model: Group,
          where: { status: 1 },
          required: false,
          attributes: ["id", "name", "strength"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    // Sending proper structured response
    res.status(200).send({
      message: "Dashboard details fetched successfully",
      dashboardDetails: dashboardDetails,
    });
  } catch (error) {
    // Handling errors more gracefully
    res.status(500).send({
      error: true,
      message: "Failed to fetch dashboard details",
      details: error.message,
    });
  }
};
const createGroup = async (req, res) => {
  try {
    const { name, strength, user } = req.body;
    const { id } = user;

    const findUser = await User.findOne({ where: { id: id } });

    if (!findUser) {
      return res.status(404).send({
        error: true,
        message: "User not found",
      });
    }

    const group = await Group.create({
      name: name,
      strength: strength,
      user_id: id,
    });
    if (group) {
      return res.send({
        error: false,
        message: "Group created successfully",
      });
    } else {
      return res.status(500).send({
        error: true,
        message: "Failed to create group",
      });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const invite = async (req, res, next) => {
  const { email } = req.body;
  sendEmailVerificationCode(email);

  console.log("re>>>>>>>>>>>.", req.body);
  res.send("Hi Im From DashBoard");
};

const getMoney = async (req, res) => {
  const { email } = req.body;
  const user = await MoneyData.findAll({ where: { email: email } });
  if (user === null) {
    res.send({
      status: 401,
      error: true,
      message: "Invalid email address",
    });
  } ;
    res.send({
      status: 200,
      error: false,
      message: "Fetched successfully",
      data:user
    });
  }
module.exports = {
  createUser,
  verifyEmail,
  addBill,
  loginUser,
  dashboard,
  createGroup,
  invite,
  getMoney
};
