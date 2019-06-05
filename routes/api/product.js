const express=require('express');
const router=express.Router();
const Product=require('../../models/product');
const {validtorProduct,validatorproductcomment}=require('../../validator/validatorProduct');
const authorizing = require('../../middleware/auth');
const path=require('path');
const passport=require('passport')
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/public/upload/product/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
})
router.get('/',(req,res)=>{
Product.find().sort({Date: -1})
.populate('Producer', ['Name' ,'_id'])
.then(pro=>{
    res.status(200).json(pro)
}).catch(console.log)
})
//post
router.post('/',passport.authenticate('jwt', {session: false}),authorizing('admin'),upload.any(),(req,res)=>{
    
    
    const {errors,isValid}=validtorProduct(req.body)
     if(!isValid) return res.status(400).json(errors)
    const {Name,Title,Detail,Price,Producer}=req.body;
const images=[];
for(let i=0;i<req.files.length;i++){
    images.push(req.files[i].filename)
}
Product.findOne({Name}).then(pro=>{
    if(pro){
        res.status(400).json({NoName:'Name is used'})
    }
    const newProduct=new Product({
        Name,Title,Detail,Price,Producer,
        Image:images
    })
    
    newProduct.save().then(pro=>{
        res.json(pro)
    }).catch(console.log)
}).catch(console.log)
   
})
//getupdate
router.get('/getupdateproduct/:id',passport.authenticate('jwt', {session: false}),authorizing('admin'),(req,res)=>{
    Product.findById(req.params.id).then(pro=>{
        res.status(200).json(pro)
    }).catch(console.log)
})
//postupdate
router.post('/postupdateproduct/:id',passport.authenticate('jwt', {session: false}),authorizing('admin'),upload.any(),(req,res)=>{
    // const {errors,isValid}=validtorProduct(req.body)
    // if(!isValid) return res.status(400).json(errors)
    const images=[];
for(let i=0;i<req.files.length;i++){
    images.push(req.files[i].filename);
}
const {Name,Title,Detail,Price,Producer}=req.body;
    Product.findById(req.params.id).then(pro=>{
        pro.Name=Name;
        pro.Title=Title;
        pro.Detail=Detail;
        pro.Price=Price;
        pro.Producer=Producer;
        pro.Image=pro.Image.concat(images)
        pro.save().then(pro=>{
            res.status(200).json(pro)
        }).catch(console.log)
        
    }).catch(console.log)
})
//delete
router.delete('/:id',passport.authenticate('jwt', {session: false}),authorizing('admin'),(req,res)=>{
    Product.findByIdAndDelete(req.params.id).then(pro=>{res.status(200).json(pro)}).catch(console.log)
})
router.delete('/hinhanh/:id/:ha',passport.authenticate('jwt', {session: false}),authorizing('admin'),(req,res)=>{
    Product.findById(req.params.id).then(pro=>{
        const ha=req.params.ha
        const indeximage=pro.Image.map((pro)=>pro.toString()).indexOf(ha);
        pro.Image.splice(indeximage,1);
        pro.save()
        res.status(200).json(pro)
    })
})
///
router.get('/allProduct',(req,res)=>{
    Product.find().then(pro=>{
        res.status(200).json(pro)
    }).catch(console.log)
    })
    // porduct:id
    router.get('/detail/:id',(req,res)=>{
        Product.findById(req.params.id).then(pro=>{
            res.status(200).json(pro)
        }).catch(console.log)
    })
    //rating
    router.post('/rating/:id',
    passport.authenticate('jwt', {session: false}),
    (req,res)=>{
        const user=req.user.id;
        const errors={};
        
        Product.findById(req.params.id).then(pro=>{
          if(pro.Rating.find(Rating=>Rating.User==user)){
            errors.nouser='You have already evaluated it, so you cannot continue to evaluate'
            return res.status(400).json(errors);
        }
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
    //post commnet
    router.post('/comment/:id'
    ,passport.authenticate('jwt', {session: false})
    ,(req,res)=>{
        const {errors,isValid}=validatorproductcomment(req.body)
        if(!isValid) return res.status(400).json(errors)
        Product.findById(req.params.id).then(pro=>{
            const newComment=({
                Comment:req.body.Comment,
                User:req.body.User,
                Name:req.body.Name
            })
            pro.Comment.push(newComment)
            pro.save()
            console.log(pro)
            res.status(200).json(pro)
        })
    })
module.exports=router