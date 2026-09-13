const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Billing = require("../models/Billing");
const Notification = require("../models/Notification");
// ============================
// Add Patient
// ============================
const addPatient = async (req, res) => {
    try {

        const {
            name,
            age,
            gender,
            phone,
            email,
            address,
        } = req.body;

        const existingPatient = await Patient.findOne({ email });

        if (existingPatient) {
            return res.status(400).json({
                success: false,
                message: "Patient Already Exists",
            });
        }

        const patient = new Patient({
            name,
            age,
            gender,
            phone,
            email,
            address,
        });

        await patient.save();
        await Notification.create({
            title: "New Patient Added",
            message: `${patient.name} has been added successfully.`,
            role: "Admin",
        });

        const io = req.app.get("io");

        if (io) {
            io.emit("newNotification", notification);
        }

        res.status(201).json({
            success: true,
            message: "Patient Added Successfully",
            patient,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ============================
// Get All Patients
// ============================
const getPatients = async (req, res) => {

    try {

        const patients = await Patient.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            patients,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ============================
// Get Single Patient
// ============================
const getPatientById = async (req, res) => {

    try {

        const patient = await Patient.findById(req.params.id);

        if (!patient) {

            return res.status(404).json({
                success: false,
                message: "Patient Not Found",
            });

        }

        res.status(200).json({
            success: true,
            patient,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ============================
// Update Patient
// ============================
const updatePatient = async (req, res) => {

    try {

        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient Updated Successfully",
            patient,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ============================
// Delete Patient
// ============================
const deletePatient = async (req, res) => {

    try {

        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ============================
// Patient Dashboard
// ============================
const getPatientDashboard = async (req, res) => {

    try {

        const patientId = req.user.id;

        const appointments = await Appointment.countDocuments({
            patient: patientId,
        });

        let bills = 0;

        try {
            bills = await Billing.countDocuments({
                patient: patientId,
            });
        } catch {
            bills = 0;
        }

        res.status(200).json({
            success: true,
            appointments,
            reports: 0,
            prescriptions: 0,
            bills,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ============================
// Export
// ============================
module.exports = {
    addPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    getPatientDashboard,
};