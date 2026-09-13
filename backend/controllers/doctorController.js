const Doctor = require("../models/Doctor");
const Notification = require("../models/Notification");

// ===========================
// Add Doctor
// ===========================
const addDoctor = async (req, res) => {

    try {

        const {
            name,
            specialization,
            email,
            phone,
            experience,
            department,
        } = req.body;

        // Check Email Already Exists
        const existingDoctor = await Doctor.findOne({ email });

        if (existingDoctor) {

            return res.status(400).json({
                success: false,
                message: "Doctor Email Already Exists",
            });

        }

        // Create Doctor
        const doctor = new Doctor({
            name,
            specialization,
            email,
            phone,
            experience,
            department,
        });

        await doctor.save();

        // Create Notification
        const notification = await Notification.create({

            title: "New Doctor Added",

            message: `${doctor.name} has been added successfully.`,

            role: "Admin",

        });

        // Live Notification
        const io = req.app.get("io");

        if (io) {

            io.emit("newNotification", notification);

        }

        res.status(201).json({

            success: true,

            message: "Doctor Added Successfully",

            doctor,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ===========================
// Get All Doctors
// ===========================
const getDoctors = async (req, res) => {

    try {

        const doctors = await Doctor.find().sort({
            createdAt: -1,
        });

        res.status(200).json({

            success: true,

            doctors,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
// ===========================
// Get Single Doctor
// ===========================
const getDoctorById = async (req, res) => {

    try {

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {

            return res.status(404).json({
                success: false,
                message: "Doctor Not Found",
            });

        }

        res.status(200).json({

            success: true,

            doctor,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ===========================
// Update Doctor
// ===========================
const updateDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true,
            }

        );

        if (!doctor) {

            return res.status(404).json({

                success: false,

                message: "Doctor Not Found",

            });

        }

        res.status(200).json({

            success: true,

            message: "Doctor Updated Successfully",

            doctor,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
// ===========================
// Delete Doctor
// ===========================
const deleteDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctor) {

            return res.status(404).json({
                success: false,
                message: "Doctor Not Found",
            });

        }

        // Create Notification
        const notification = await Notification.create({

            title: "Doctor Deleted",

            message: `${doctor.name} has been removed.`,

            role: "Admin",

        });

        // Live Notification
        const io = req.app.get("io");

        if (io) {

            io.emit("newNotification", notification);

        }

        res.status(200).json({

            success: true,

            message: "Doctor Deleted Successfully",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ===========================
// Export
// ===========================
module.exports = {
    addDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};