const express=require('express');
const multer=require('multer');
const Producer=require('../../models/producer');
const router=express.Router();
const validatorProduceradd=require('../../validator/validatorProducer');
const {findProducer}=require('../../controler/producercontroler')
const authorizing= require('../../middleware/auth');
const passport=require('passport');
router.post('/',passport.authenticate('jwt', {session: false}),authorizing('admin'),(req,res)=>{
    const {errors,isValid}=validatorProduceradd(req.body)
    if(!isValid) return res.status(400).json(errors)
    const {Name}=req.body;

 Producer.findOne({Name}).then(pro=>{
    if (pro) {
        return res.status(404).json({ noName: "Name is not found" });
      }
     
      const newProducer=new Producer({
        Name
    })
    newProducer.save().then(pro=>res.json(pro))
 }).catch(console.log)
  
  
});
router.get('/',passport.authenticate('jwt', {session: false}),authorizing('admin'),(req,res)=>{
 Producer.find().then(pro=>{
     res.status(200).json(pro)
 })
})
router.get('/getupdateproducer/:id',passport.authenticate('jwt', {session: false}),authorizing('admin'),(req,res)=>{
Producer.findById(req.params.id).then(pro=>{
    res.status(200).json(pro)
})
router.post('/postupdateproducer/:id',passport.authenticate('jwt', {session: false}),authorizing('admin'),(req,res)=>{
    const {errors,isValid}=validatorProduceradd(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    Producer.findById(req.params.id).then(pro=>{
        
        pro.Name=req.body.Name;
        pro.save().then(pro=>{
            res.status(200).json(pro)
        }).catch(console.log)

    })
})
})
router.delete('/:id',passport.authenticate('jwt', {session: false}),authorizing('admin'),(req,res)=>{
   Producer.findByIdAndDelete(req.params.id).then(pro=>{
       res.status(200).json(pro)
   })
})
module.exports=router;