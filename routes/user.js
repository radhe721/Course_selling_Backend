const {Router} = require("express");
const userRouter = Router();

userRouter.post("/user/signup", function(req,res){
    res.send("signup route")
});
userRouter.post("/user/signin", function(req,res){
    res.send("Signin route")
});
userRouter.post("/user/purchases", function(req,res){
    res.send("purchase route")
})

module.exports = {
    userRouter :userRouter
}