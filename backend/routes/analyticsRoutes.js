const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getAnalytics,
} = require("../controllers/analyticsController");


// Analytics
router.get("/", protect, getAnalytics);


// Test Route
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Analytics Route Working",
    });
});


module.exports = router;