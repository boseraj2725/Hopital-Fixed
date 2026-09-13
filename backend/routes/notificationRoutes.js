const express = require("express");

const router = express.Router();

const {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
    clearAllNotifications,
} = require("../controllers/notificationController");

// ==========================
// Test Route
// ==========================
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Notification Route Working",
    });
});

// ==========================
// Get All Notifications
// ==========================
router.get("/", getNotifications);

// ==========================
// Create Notification
// ==========================
router.post("/add", createNotification);

// ==========================
// Mark As Read
// ==========================
router.put("/read/:id", markAsRead);

// ==========================
// Delete One Notification
// ==========================
router.delete("/delete/:id", deleteNotification);

// ==========================
// Clear All Notifications
// ==========================
router.delete("/clear", clearAllNotifications);

module.exports = router;