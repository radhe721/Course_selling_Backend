const {Router} = require("express");
const courseRouter = Router();

    courseRouter.post("/course/purchase", function(req,res){
    res.send("courses route")
});
courseRouter.get("/course/preview", function(req,res){
    res.json({
        message:"Course Selling"
    })
})

module.exports = {
    courseRouter : courseRouter
}