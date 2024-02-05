const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
   email:Joi.string(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))   
})
   
const validateRequest = (req, res,next) => {  

    try {
        const reqbody= req.body;


        const { error, value } = schema.validate(reqbody);
        if(error) {
            res.send(error.details[0].message);
        }else{
            next()
        }
    }
    catch (err) { }
 }
 module.exports = {
    validateRequest
  };