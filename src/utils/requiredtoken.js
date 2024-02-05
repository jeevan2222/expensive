const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      console.log(">>>>>>>>>>>>>>>>>>", bearerToken);
      var decoded = await jwt.verify(bearerToken, "shhhhh");
      console.log("decoded>>>>>>>>>>>>>>>>>", decoded);
      req.token = bearerToken;
      next();
    } else {
      res.status(401).send("Not logged-in");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong: " + err.message);
  }
};

module.exports = {
  verifyToken,
};
