const Joi = require("joi");
const jwt = require("jsonwebtoken");
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const validateRequest = (req, res, next) => {
  try {
    const reqbody = req.body;

    const { error, value } = schema.validate(reqbody);
    if (error) {
      res.send(error.details[0].message);
    } else {
      next();
    }
  } catch (err) {}
};

const authentication = (req, res, next) => {
  try {
    if (!req.headers.token) {
      return res.status(403).json({ error: "No credentials sent!" });
    }

    const token = req.headers.token;

    jwt.verify(token, process.env.key, function (err, decoded) {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(403).json({ error: "Invalid token!" });
      } else {
        console.log("Decoded token:", decoded);
        req.user = decoded;

        next();
      }
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  validateRequest,
  authentication,
};
