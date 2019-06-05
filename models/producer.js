const mongoose=require('mongoose');
const ProducerSchema=new mongoose.Schema({
    Name:{type:String,required:true}
})
module.exports=mongoose.model('Producer',ProducerSchema);