const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    addDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctorController");

// ===========================
// Test Route
// ===========================

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Doctor Route Working",
    });
});

// ===========================
// Get All Doctors
// Admin, Doctor & Patient
// ===========================

router.get(
    "/",
    protect,
    authorize("Admin", "Doctor", "Patient"),
    getDoctors
);

// ===========================
// Get Single Doctor
// Admin, Doctor & Patient
// ===========================

router.get(
    "/:id",
    protect,
    authorize("Admin", "Doctor", "Patient"),
    getDoctorById
);

// ===========================
// Add Doctor
// Admin Only
// ===========================

router.post(
    "/add",
    protect,
    authorize("Admin"),
    addDoctor
);

// ===========================
// Update Doctor
// Admin Only
// ===========================

router.put(
    "/update/:id",
    protect,
    authorize("Admin"),
    updateDoctor
);

// ===========================
// Delete Doctor
// Admin Only
// ===========================

router.delete(
    "/delete/:id",
    protect,
    authorize("Admin"),
    deleteDoctor
);

module.exports = router;  