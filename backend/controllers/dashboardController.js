const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Billing = require("../models/Billing");

const getDashboardStats = async (req, res) => {

    try {

        const doctors = await Doctor.countDocuments();

        const patients = await Patient.countDocuments();

        const appointments = await Appointment.countDocuments();

        const bills = await Billing.countDocuments();

        const revenue = await Billing.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            doctors,
            patients,
            appointments,
            bills,
            revenue: revenue.length ? revenue[0].total : 0,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    getDashboardStats,
};