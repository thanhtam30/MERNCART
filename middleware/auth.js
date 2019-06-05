const authorizing=(userType)=>{
  return (req,res,next)=>{
    if(req.user.userType===userType){
      next();
    }else{
      res.status(400).json({errors: "You dont have permission"})
    }
  }
}

module.exports = authorizing;
