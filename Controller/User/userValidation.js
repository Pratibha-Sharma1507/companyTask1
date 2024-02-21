const Joi = require("joi");

const signupSchema = Joi.object({
    userid: Joi.string().min(2).max(30).required(),
    name: Joi.string().min(2).max(50).required(),
    password : Joi.string().min(2).max(30).required()  
  })  
const loginSchema = Joi.object({
    userid: Joi.string().min(2).max(30).required(),
    password : Joi.string().min(2).max(30).required()  
  })  

const validateSignup = (req, res, next) => {
    const{error, value} = signupSchema.validate(req.body);

    if(error){
        console.log(error);
        return res.send("Invalid request..");
    }
     next();
    // res.send(" Register Successfully");
  };
  const validateLogin = (req, res, next) => {
    const{error, value} = loginSchema.validate(req.body);

    if(error){
        console.log(error);
        return res.send("Invalid request..");
    }
     next();
    // res.send(" Register Successfully");
  };


  module.exports = { validateSignup, validateLogin }