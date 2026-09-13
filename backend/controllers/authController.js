const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// Register
// ======================

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        // Check existing user
        const userExists = await User.findOne({
            email: email.toLowerCase(),
        });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Patient user
        const user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "Patient",
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "Registration Successful",
        });
    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================
// Login
// ======================

const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Login response
        res.status(200).json({
            success: true,
            message: "Login Successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================
// Export
// ======================

module.exports = {
    register,
    login,
};