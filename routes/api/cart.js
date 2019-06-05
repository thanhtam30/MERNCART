const express=require('express');
const router=express.Router();
const passport=require('passport');
const validatororder=require('../../validator/validatorOrder');
const Order=require('../../models/Order');
  // SAVE SESSION CART API
  router.post('/', (req, res)=>{
    var cart = req.body;
    req.session.cart = cart;
    req.session.save((err)=>{
      if(err){
        console.log('# API POST CART SESSION: ', err);
      }
      
      res.json(req.session.cart);
    })
  });
  // GET SESSION CART API
  router.get('/', (req, res)=>{
    if(typeof req.session.cart !== 'undefined'){
      res.json(req.session.cart);
    }
  });
router.post('/order', 
passport.authenticate('jwt', {session: false}),
(req,res)=>{
const {Name,Phone,Address}=req.body;
const {errors,isValid}=validatororder(req.body)
     if(!isValid) return res.status(400).json(errors)
const newOrder=new Order({
Name,Phone,Address,User:req.user.id,Cart:req.session.cart
})
newOrder.save(order=>{
  console.log(order)
  req.session.destroy();
  res.status(200).json(order);
  
})
})


module.exports=router;