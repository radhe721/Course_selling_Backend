const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/user');


// Generate JWT Token
const generateToken = (userId) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Defined" : "Undefined");
    console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN ? "Defined" : "Undefined");
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// SIGNUP Route;
userRouter.post("/signup", async function (req, res) {
    const { email, password, username, lastname } = req.body;

    try {
        console.log("Attempting to find user by email:", email);
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log("User already exists for email:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        console.log("Hashing password for email:", email, "Password length:", password ? password.length : "undefined");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Attempting to create new user for email:", email);
        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            username,
            lastname
        });
        console.log("New user created with ID:", newUser._id);

        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "Sign up successful",
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during signup"
        });
    }
});

// SIGNIN Route
userRouter.post("/signin", authMiddleware, async function (req, res) {
    const { email, password } = req.body;

    try {
        console.log("Attempting to find user by email for signin:", email);
        const user = await userModel.findOne({ email });

        if (!user) {
            console.log("User not found for email:", email);
            return res.status(400).json({ message: "User not found" });
        }

        console.log("Attempting to compare passwords for user:", user.email);
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log("Password mismatch for user:", user.email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.json({
            message: "Signed in successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during sign in" });
    }
});


// Protected route
userRouter.post("/purchases", authMiddleware, function (req, res) {
    res.json({
        message: `Hello user ${req.user.id}, here are your purchases.`
    });
});

module.exports = {
    userRouter: userRouter
};
