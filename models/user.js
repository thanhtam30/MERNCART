const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String},
    DOB:{type:Date},
    phone:{type:String,required:true},
    userType:{type:String,default:'user'}
})
module.exports=mongoose.model('User',UserSchema);