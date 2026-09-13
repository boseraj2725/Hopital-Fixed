const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
    getProfile,
    updateProfile,
    uploadProfileImage,
    changePassword,
} = require("../controllers/userController");

// ==========================
// Get User Profile
// ==========================
router.get(
    "/profile",
    protect,
    getProfile
);

// ==========================
// Update User Profile
// ==========================
router.put(
    "/update-profile",
    protect,
    updateProfile
);

// ==========================
// Upload Profile Image
// ==========================
router.post(
    "/upload-image",
    protect,
    upload.single("image"),
    uploadProfileImage
);

// ==========================
// Change Password
// ==========================
router.put(
    "/change-password",
    protect,
    changePassword
);

// ==========================
// Test Route
// ==========================
router.get("/test", (req, res) => {

    res.status(200).json({
        success: true,
        message: "User Routes Working Successfully",
    });

});

module.exports = router;