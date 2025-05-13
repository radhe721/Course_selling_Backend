const express = require("express");
const app = express();
require('dotenv').config();
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");
const {connectdb} = require("./db")

app.use("/api/v1/user", userRouter); 
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
PORT = 3000
app.listen(PORT,() => {
    console.log('Server is running on PORT:  http://localhost:'+PORT);
    connectdb();
})