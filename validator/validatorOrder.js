const validator = require("validator");
const _=require('lodash');


  const  validatororder=(data)=>{
    let errors={};
    let {Phone,Name,Address}=data;
    if(validator.isEmpty(Name)){
        errors.Name='Name is required';
    }
    if(validator.isEmpty(Address)){
        errors.Address='Address is required';
    }
    if(validator.isEmpty(Phone)){
        errors.Phone='Phone is required';
    }
   if(!validator.isInt(Phone)){
       errors.Phone='Phone is Number'
   }
  if(!validator.isLength(Phone,{min:10,max:10})){
    errors.Phone='Phone number has less than 10';
  }
  return {
      errors,
      isValid: _.isEmpty(errors)
  }  
  };
module.exports=validatororder;
