const _ = require('lodash');
const validator = require('validator')
const path=require('path')
const validatorsignin = (data) => {
    let errors = {}

    let {email, password,  fullName, phone, DOB} = data;
    
    if(!email) email = "";
    if(!password) password = "";
    
    if(!fullName) fullName = ""
    if(!phone)phone="";
    if(!DOB)DOB="";
    
    // validate email
    if(!validator.isEmail(email)){
        errors.email = "Email is invalid"
    }
    if(validator.isEmpty(email)){
        errors.email = "Email is required"
    }
  
    if(validator.isEmpty(phone)){
        errors.phone = "Phone is required"
    }
    if(validator.isEmpty(DOB)){
        errors.DOB = "DOB is required"
    }
  
    // validate password
    if(validator.isLength(password, {min: 0, max: 7})){
        errors.password = "Password must have at least 8 characters"
    }
  
    // validate fullName
    if(validator.isEmpty(fullName)){
        errors.fullName = "Full name is required"
    }
//validator email
if(!validator.isEmail(email)){
    errors.email="Not found email"
}
// var ext = path.extname(image);
//         if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//            errors.image='Not image'
//         }
    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}

module.exports = validatorsignin;