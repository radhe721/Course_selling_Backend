const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();
const bcrypt = require('bcrypt');

userRouter.post("/signup", async function (req, res) {
    const { email, password, username, lastname } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await userModel.create({
            email,
            password: hashedPassword,
            username,
            lastname
        });

        res.status(201).json({
            message: "Sign up successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during signup"
        });
    }
});
userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Signed in successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during sign in" });
    }
});
userRouter.post("/purchases", function (req, res) {
    res.json({
        message: "User Purchsase End Point"
    })
})

module.exports = {
    userRouter: userRouter
}