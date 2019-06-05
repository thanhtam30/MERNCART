const validator = require("validator");
const _=require('lodash');

const  validtorProduct=(data)=>{
  let errors={};
  let {Name,Title,Detail,Price,Producer}=data;
  if(!Name)Name="";
  if(!Title)Title='';
  if(!Detail)Detail='';
  if(!Price)Price='';
  if(!Producer)Producer='';
  if(validator.isEmpty(Name)){
      errors.Name='Name is required';
  }
  if(validator.isEmpty(Title)){
    errors.Title='Title is required';
}
if(validator.isEmpty(Detail)){
    errors.Detail='Detail is required';
}
if(validator.isEmpty(Price)){
    errors.Price='Price is required';
}
if(!validator.isInt(Price)){
    errors.Price='Price is number';
}
if(validator.isEmpty(Producer)){
    errors.Producer='Producer is required';
}

return {
    errors,
    isValid: _.isEmpty(errors)
}  
};

const  validatorproductcomment=(data)=>{
    let errors={};
    let {Comment}=data;
    
    if(validator.isEmpty(Comment)){
        errors.Comment='Comment is required';
    }
   
  
  return {
      errors,
      isValid: _.isEmpty(errors)
  }  
  };
  
module.exports={validtorProduct,validatorproductcomment};
