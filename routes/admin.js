const {Router} = require("express");
const adminRouter = Router();
adminRouter.post("/ignup", function(req,res){
     res.json({
        message: "Sign Up End Point of Admin"
    })
});
adminRouter.post("/signin", function(req,res){
    res.json({
        message: "Sign Up End Point of Admin"
    })
});
adminRouter.use(adminMiddleware);
adminRouter.post("/course", function(req,res){
    res.json({
        message: "Course End Point of Admin"
    })
});
adminRouter.put("/course", function(req,res){
    res.json({
        message: "Course End Point of Admin"
    })
});
adminRouter.get("/course/bulk", function(req,res){
    res.json({
        message: "Complete course all course access"
    })
});

module.exports = ({
    adminRouter :adminRouter
})
