const express = require("express");

const router = express.Router();

const {
    addBill,
    getBills,
    getBillById,
    updateBill,
    deleteBill,
    sendInvoiceEmail,
} = require("../controllers/billingController");

// ===============================
// Test Route
// ===============================
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Billing Route Working",
    });
});

// ===============================
// Get All Bills
// ===============================
router.get("/", getBills);

// ===============================
// Get Single Bill
// ===============================
router.get("/:id", getBillById);

// ===============================
// Add Bill
// ===============================
router.post("/add", addBill);

// ===============================
// Update Bill
// ===============================
router.put("/update/:id", updateBill);

// ===============================
// Delete Bill
// ===============================
router.delete("/delete/:id", deleteBill);

// ===============================
// Send Invoice Email
// ===============================
router.post("/send-email/:id", sendInvoiceEmail);

module.exports = router;