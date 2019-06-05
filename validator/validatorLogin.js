const validator = require("validator");
const _=require('lodash');

const  validatorLogin=(data)=>{
  
    let errors = {}

    let {email, password} = data;
    if(!email) email = "";
    if(!password) password = "";
    
  
    // validate email
    if(!validator.isEmail(email)){
        errors.email = "Email is invalid"
    }
    if(validator.isEmpty(email)){
        errors.email = "Email is required"
    }
  
  
  
    // validate fullName
    if(validator.isEmpty(password)){
        errors.password = "Password is required"
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }  
};
module.exports=validatorLogin;
