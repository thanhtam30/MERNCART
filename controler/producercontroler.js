const Producer=require('../models/producer');
module.exports.deleteProducer=(req,res)=>{
    Producer.findByIdAndDelete(req.params.id).then(pro=>{
        res.status(200).json(pro)
    }).catch(console.log)
}
module.exports.findProducer=(req,res)=>{
    Producer.find().then(pro=>{
        res.status(400).json(pro)
    }).catch(console.log)
}
module.exports.findProducerid=(req,res)=>{
    Producer.findById(req.params.id).then((pro)=>{
        res.status(400).json(pro)
    }).catch(console.log)
}