const express = require("express");

const router = express.Router();


const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require("../controllers/appointmentController");


// Auth Middleware
const protect = require("../middleware/authMiddleware");



// ===============================
// Test Route
// ===============================

router.get("/test", (req, res) => {

    res.json({

        success: true,

        message: "Appointment Route Working",

    });

});




// ===============================
// Get All Appointments
// ===============================

router.get(
    "/",
    protect,
    getAppointments
);




// ===============================
// Get Appointment By ID
// ===============================

router.get(
    "/:id",
    protect,
    getAppointmentById
);




// ===============================
// Create Appointment
// ===============================

router.post(
    "/add",
    protect,
    createAppointment
);




// ===============================
// Update Appointment
// ===============================

router.put(
    "/update/:id",
    protect,
    updateAppointment
);




// ===============================
// Delete Appointment
// ===============================

router.delete(
    "/delete/:id",
    protect,
    deleteAppointment
);



module.exports = router;