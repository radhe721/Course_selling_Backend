const {Router} = require("express");
const userRouter = Router();

userRouter.post("/user/signup", function(req,res){
     res.json({
        message: "Sign Up End Point of User"
    })
});
userRouter.post("/user/signin", function(req,res){
    res.json({
        message: "Sign Up End Point of User"
    })
});
userRouter.post("/user/purchases", function(req,res){
     res.json({
        message: "User Purchsase End Point"
    })
})

module.exports = {
    userRouter :userRouter
}