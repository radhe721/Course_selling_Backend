const {Router} = require("express");
const { adminModel, courseModel } = require("../db");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/admin');

// Generate JWT Token
const generateToken = (adminId) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET_admin ? "Defined" : "Undefined");
    console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN ? "Defined" : "Undefined");
    return jwt.sign({ id: adminId }, process.env.JWT_SECRET_admin, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
adminRouter.post("/signup", async function(req,res){
    const { email, password, username, lastname } = req.body;

    try {
        console.log("Attempting to find user by email:", email);
        const existingUser = await adminModel.findOne({ email });
        if (existingUser) {
            console.log("User already exists for email:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        console.log("Hashing password for email:", email, "Password length:", password ? password.length : "undefined");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Attempting to create new admin for email:", email);
        const newAdmin = await adminModel.create({
            email,
            password: hashedPassword,
            username,
            lastname
        });
        console.log("New user created with ID:", newAdmin._id);

        const token = generateToken(newAdmin._id);

        res.status(201).json({
            message: "Sign up successful",
            token,
            user: {
                id: newAdmin._id,
               email: newAdmin.email,
               username: newAdmin.username,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during signup"
        });
    }
});
adminRouter.post("/signin", authMiddleware, async function(req,res){
      const { email, password } = req.body;

    try {
        console.log("Attempting to find user by email for signin:", email);
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            console.log("User not found for email:", email);
            return res.status(400).json({ message: "User not found" });
        }

        console.log("Attempting to compare passwords for user:", admin.email);
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            console.log("Password mismatch for user:", admin.email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(admin._id);

        res.json({
            message: "Signed in successfully",
            token,
            user: {
                id: admin._id,
                email: admin.email,
                username: admin.username,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during sign in" });
    }
});
// Middleware to protect routes


// adminRouter.use(adminMiddleware);
adminRouter.post("/course", authMiddleware, async function (req, res) {
    const adminId = req.user.id; // Corrected to use req.user.id
    try {
        const { title, description, price, imageUrl } = req.body; // Fixed spelling of 'description'
        const course = await courseModel.create({
            title: title,
            description: description, // Fixed spelling
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId,
        });
        res.status(201).json({ // Added status code
            message: "Course Created Successfully",
            course, // Optionally include the created course in the response
        });
    } catch (error) { // Fixed error handling
        console.error("Error creating course:", error);
        res.status(500).json({ message: "An error occurred while creating the course" });
    }
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
