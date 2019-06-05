const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User=require('../../models/user')
const path=require('path');
var multer = require('multer');
const validatorsignin=require('../../validator/validatorSignin');
const validatorLogin=require('../../validator/validatorLogin');
const keys = require("../../config/keys");
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/public/upload/user/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({ storage: storage ,
  // fileFilter: function (req, file, callback) {
  //     var ext = path.extname(file.originalname);
  //     if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
  //         return callback(new Error('Only images are allowed'))
  //     }
  //     callback(null, true)
  // },
  // limits:{
  //     fileSize: 1024 * 1024
  // }
});
router.post('/signin',upload.single('image'),(req,res)=>{
    const {errors,isValid}=validatorsignin(req.body)
    if(!isValid) return res.status(400).json(errors)
    const {fullName,email,password,DOB,phone}=req.body;
   
  

    User.findOne({$or:[{email},{phone}]}).then(user=>{
       if(user){
        if(user.email===email){errors.noemail='Email đã sử dụng'}
        if(user.phone===phone){errors.nophone='Phone đã sử dụng'}
        return res.status(400).json(errors)
       }
   
       if(typeof req.file=='undefined'){
        
        return res.status(400).json({image:'image is required'})

    }else{
        const path=require('path');
        const exp=path.extname(req.file.filename)
        if(exp!=='.jpg' && exp!=='.gif' && exp!=='.jpeg' && exp!=='.png'){
            
            return res.status(400).json({noimage:'No image'});
        }
    }
       const newUser=new User({
        fullName,email,password,DOB,phone,image:req.file.filename
       }) 
       bcrypt.genSalt(10, (err, salt) => {
        if(err) return res.status(400).json(err)

        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) return res.status(400).json(err)

            newUser.password = hash;
            newUser.save()
                .then(user => {
                    res.status(200).json(user)
                })
                .catch(err => res.status(400).json(err))
        })
    })
      
    })
      
})
router.post('/login', (req, res) => {
    const {email, password } = req.body;
    const {errors,isValid}=validatorLogin(req.body)
    if(!isValid) return res.status(400).json(errors)
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ noemail: "Email not found" });
        }
    
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            
            const payload = {
              id: user.id,
              fullName: user.fullName,
              image:user.image,
              phone:user.phone,
              userType:user.userType
            };
    
            
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ nopassword: "Password incorrect" });
          }
        });
      });

})

module.exports=router;