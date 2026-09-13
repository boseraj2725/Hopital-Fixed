const Notification = require("../models/Notification");

// ==========================
// Create Notification
// ==========================
const createNotification = async (req, res) => {

    try {

        const notification = await Notification.create(req.body);

        const io = req.app.get("io");

        if (io) {
            io.emit("newNotification", notification);
        }

        res.status(201).json({
            success: true,
            notification,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ==========================
// Get All Notifications
// ==========================
const getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ==========================
// Mark As Read
// ==========================
const markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        res.status(200).json({
            success: true,
            notification,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ==========================
// Delete Notification
// ==========================
const deleteNotification = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndDelete(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ==========================
// Clear All Notifications
// ==========================
const clearAllNotifications = async (req, res) => {

    try {

        await Notification.deleteMany({});

        res.status(200).json({
            success: true,
            message: "All Notifications Cleared",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
    clearAllNotifications,
};