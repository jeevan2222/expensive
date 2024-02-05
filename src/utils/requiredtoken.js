const jwt = require("jsonwebtoken");

const verifyAdminToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      console.log(">>>>>>>>>>>>>>>>>>", bearerToken);
      let decoded = await jwt.verify(bearerToken, "shhhhh");
      if(decoded.UserRole=="admin"){
        req.token = bearerToken;
        next();
      }else{
        res.status(403).send("You don't have permission to ")
      }
     
     
    } else {
      res.status(401).send("Not logged-in");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong: " + err.message);
  }
};
const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      console.log(">>>>>>>>>>>>>>>>>>", bearerToken);
      let decoded = await jwt.verify(bearerToken, "shhhhh");
      console.log(">>>>>>>>>>>>>>>>>>", decoded);
      if(decoded.UserRole=="admin" ||decoded.UserRole=="employee"){
        req.token = bearerToken;
        next();
      }else{
        res.status(403).send("You don't have permission to ")
      }
     
     
    } else {
      res.status(401).send("Not logged-in");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong: " + err.message);
  }
};


module.exports = {
  verifyAdminToken,
  verifyToken
};
