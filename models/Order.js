const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    Address:{type:String,required:true},
    Phone:{type:String},
    Cart:{type:Object},
    Date:{type:Date,default:Date.now}
})
module.exports=mongoose.model('Order',OrderSchema);