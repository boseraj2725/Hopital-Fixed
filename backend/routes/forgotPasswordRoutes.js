const express = require("express");

const router = express.Router();

const {
    resetPassword,
} = require("../controllers/forgotPasswordController");

// ===========================
// Reset Password
// ===========================

router.put("/reset-password", resetPassword);

// ===========================
// Test Route
// ===========================

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Forgot Password Route Working",
    });
});

module.exports = router;