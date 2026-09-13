const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    generateInvoice,
} = require("../controllers/invoiceController");

// ==========================
// Test Route (must stay first)
// ==========================
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Invoice Route Working",
    });
});

// ==========================
// View / Download Invoice PDF
// ==========================
router.get("/:id", protect, generateInvoice);

module.exports = router;
