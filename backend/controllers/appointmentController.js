const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");

// ==========================================
// Create Appointment
// ==========================================

const createAppointment = async (req, res) => {
    try {
        const {
            doctor,
            appointmentDate,
            appointmentTime,
            reason,
        } = req.body;

        // ==================================
        // Validation
        // ==================================

        if (!doctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor is required",
            });
        }

        if (!appointmentDate) {
            return res.status(400).json({
                success: false,
                message:
                    "Appointment date is required",
            });
        }

        if (!appointmentTime) {
            return res.status(400).json({
                success: false,
                message:
                    "Appointment time is required",
            });
        }

        if (!reason || !reason.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "Appointment reason is required",
            });
        }

        // ==================================
        // Patient from logged-in user
        // ==================================

        const appointment =
            new Appointment({
                patient: req.user.id,
                doctor,
                appointmentDate,
                appointmentTime,
                reason: reason.trim(),
            });

        await appointment.save();

        // ==================================
        // Notification
        // ==================================

        const notification =
            await Notification.create({
                title: "New Appointment",
                message:
                    "A new appointment has been booked.",
                role: "Admin",
            });

        // ==================================
        // Socket.IO
        // ==================================

        const io = req.app.get("io");

        if (io) {
            io.emit(
                "newNotification",
                notification
            );
        }

        // ==================================
        // Response
        // ==================================

        const populatedAppointment =
            await Appointment.findById(
                appointment._id
            )
                .populate(
                    "patient",
                    "name phone email"
                )
                .populate(
                    "doctor",
                    "name specialization"
                );

        res.status(201).json({
            success: true,
            message:
                "Appointment Booked Successfully",
            appointment:
                populatedAppointment,
        });

    } catch (error) {
        console.log(
            "CREATE APPOINTMENT ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get All Appointments
// ==========================================

const getAppointments = async (req, res) => {
    try {
        const appointments =
            await Appointment.find()
                .populate(
                    "patient",
                    "name phone email age gender"
                )
                .populate(
                    "doctor",
                    "name specialization email phone experience department"
                )
                .sort({
                    createdAt: -1,
                });

        res.status(200).json({
            success: true,
            appointments,
        });

    } catch (error) {
        console.log(
            "GET APPOINTMENTS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get Appointment By ID
// ==========================================

const getAppointmentById = async (
    req,
    res
) => {
    try {
        const appointment =
            await Appointment.findById(
                req.params.id
            )
                .populate(
                    "patient",
                    "name phone email age gender address"
                )
                .populate(
                    "doctor",
                    "name specialization email phone experience department"
                );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message:
                    "Appointment Not Found",
            });
        }

        res.status(200).json({
            success: true,
            appointment,
        });

    } catch (error) {
        console.log(
            "GET APPOINTMENT ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Update Appointment
// ==========================================

const updateAppointment = async (
    req,
    res
) => {
    try {
        const {
            patient,
            doctor,
            appointmentDate,
            appointmentTime,
            reason,
            status,
        } = req.body;

        // ==================================
        // Find Appointment
        // ==================================

        const appointment =
            await Appointment.findById(
                req.params.id
            );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message:
                    "Appointment Not Found",
            });
        }

        // ==================================
        // Validation
        // ==================================

        if (!patient) {
            return res.status(400).json({
                success: false,
                message:
                    "Patient information is missing",
            });
        }

        if (!doctor) {
            return res.status(400).json({
                success: false,
                message:
                    "Doctor information is missing",
            });
        }

        if (!appointmentDate) {
            return res.status(400).json({
                success: false,
                message:
                    "Appointment date is required",
            });
        }

        if (!appointmentTime) {
            return res.status(400).json({
                success: false,
                message:
                    "Appointment time is required",
            });
        }

        if (!reason || !reason.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "Appointment reason is required",
            });
        }

        // ==================================
        // Update Patient
        // ==================================

        appointment.patient = patient;

        // ==================================
        // Update Doctor
        // ==================================

        appointment.doctor = doctor;

        // ==================================
        // Update Date
        // ==================================

        appointment.appointmentDate =
            appointmentDate;

        // ==================================
        // Update Time
        // ==================================

        appointment.appointmentTime =
            appointmentTime;

        // ==================================
        // Update Reason
        // ==================================

        appointment.reason =
            reason.trim();

        // ==================================
        // Update Status
        // ==================================

        if (status) {
            appointment.status = status;
        }

        // ==================================
        // Save
        // ==================================

        await appointment.save();

        // ==================================
        // Populate Updated Data
        // ==================================

        const updatedAppointment =
            await Appointment.findById(
                appointment._id
            )
                .populate(
                    "patient",
                    "name phone email age gender address"
                )
                .populate(
                    "doctor",
                    "name specialization email phone experience department"
                );

        // ==================================
        // Notification
        // ==================================

        const notification =
            await Notification.create({
                title:
                    "Appointment Updated",
                message:
                    "An appointment has been updated.",
                role: "Admin",
            });

        // ==================================
        // Socket.IO
        // ==================================

        const io = req.app.get("io");

        if (io) {
            io.emit(
                "newNotification",
                notification
            );
        }

        // ==================================
        // Response
        // ==================================

        res.status(200).json({
            success: true,
            message:
                "Appointment Updated Successfully",
            appointment:
                updatedAppointment,
        });

    } catch (error) {
        console.log(
            "UPDATE APPOINTMENT ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Delete Appointment
// ==========================================

const deleteAppointment = async (
    req,
    res
) => {
    try {
        const appointment =
            await Appointment.findByIdAndDelete(
                req.params.id
            );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message:
                    "Appointment Not Found",
            });
        }

        // ==================================
        // Notification
        // ==================================

        const notification =
            await Notification.create({
                title:
                    "Appointment Deleted",
                message:
                    "An appointment has been deleted.",
                role: "Admin",
            });

        // ==================================
        // Socket.IO
        // ==================================

        const io = req.app.get("io");

        if (io) {
            io.emit(
                "newNotification",
                notification
            );
        }

        res.status(200).json({
            success: true,
            message:
                "Appointment Deleted Successfully",
        });

    } catch (error) {
        console.log(
            "DELETE APPOINTMENT ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Export
// ==========================================

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};