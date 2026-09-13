const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    getPatientDashboard,
} = require("../controllers/patientController");

// ============================
// Test Route
// ============================
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Patient Route Working",
    });
});

// ============================
// Patient Dashboard
// ============================
router.get(
    "/dashboard",
    protect,
    getPatientDashboard
);

// ============================
// Get All Patients
// ============================
router.get("/", getPatients);

// ============================
// Get Single Patient
// ============================
router.get("/:id", getPatientById);

// ============================
// Add Patient
// ============================
router.post("/add", addPatient);

// ============================
// Update Patient
// ============================
router.put("/update/:id", updatePatient);

// ============================
// Delete Patient
// ============================
router.delete("/delete/:id", deletePatient);

module.exports = router;