const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    Name:{type:String},
    Price:{type:Number},
    Title:{type:String},
    Detail:{type:String},
    Image:{type:Array},
    Producer:{type:mongoose.Schema.Types.ObjectId,ref:'Producer'},
    Rating:[{
        User:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        Name:{type:String},
        Rating:{type:Number}
    }],
    Comment:[{
        User:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        Name:{type:String},
        Comment:{type:String},
        Date:{type:Date,default:Date.now}
    }],
Date:{type:Date,default:Date.now}
})
module.exports=mongoose.model('Product',ProductSchema);