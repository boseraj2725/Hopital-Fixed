const express = require("express");

const router = express.Router();

const {
    register,
    login,
} = require("../controllers/authController");

// Test Route
router.get("/test", (req, res) => {

    res.json({
        success: true,
        message: "Auth Route Working Successfully",
    });

});

// Register
router.post("/register", register);

// Login
router.post("/login", login);

module.exports = router;