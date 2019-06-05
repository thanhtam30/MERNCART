const express=require('express');
const router=express.Router();
const passport=require('passport')
const Product=require('../../models/product');

router.get('/allProduct',(req,res)=>{
Product.find().then(pro=>{
    res.status(200).json(pro)
}).catch(console.log)
})
router.post('/rating/:id',passport.authenticate('jwt', {session: false}),(req,res)=>{
    Product.findById(req.params.id).then(pro=>{
        const newRating=({
            Rating:req.body.Rating,
            User:req.user.id,
            Name:req.body.Name
        })
        pro.Rating.push(newRating)
        pro.save()
        res.status(200).json(pro)
    })
})
router.post('/comment/:id',passport.authenticate('jwt', {session: false}),(req,res)=>{
    Product.findById(req.params.id).then(pro=>{
        const newComment=({
            Comment:req.body.Comment,
            User:req.user.id,
            Name:req.body.Name
        })
        pro.Comment.push(newComment)
        pro.save()
        res.status(200).json(pro)
    })
})
module.exports=router;