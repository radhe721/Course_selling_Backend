const {Router} = require("express");
const courseRouter = Router();

    courseRouter.post("/course/purchase", function(req,res){
     res.json({
        message: "Course purchase route"
    })
});
courseRouter.get("/course/preview", function(req,res){
    res.json({
        message:"Course Preview Route"
    })
})

module.exports = {
    courseRouter : courseRouter
}