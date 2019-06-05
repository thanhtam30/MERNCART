const validator = require("validator");
const _=require('lodash');

const  validatorProduceradd=(data)=>{
  
    let errors = {}

    let {Name} = data;
    if(!Name) Name = "";
    if(validator.isEmpty(Name)){
        errors.Name = "Name is required"
    }
    return {
        errors,
        isValid: _.isEmpty(errors)
    }  
};
module.exports=validatorProduceradd;
