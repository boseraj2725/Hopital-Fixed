const express = require("express");

const router = express.Router();

const {
    getReports,
} = require("../controllers/reportController");

// ==========================
// Test Route
// ==========================
router.get("/test", (req, res) => {

    res.json({
        success: true,
        message: "Report Route Working",
    });

});

// ==========================
// Get Reports
// ==========================
router.get("/", getReports);

module.exports = router;