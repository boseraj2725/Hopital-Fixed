const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Billing = require("../models/Billing");

// ==========================
// Get Reports
// ==========================
const getReports = async (req, res) => {

    try {

        const totalDoctors = await Doctor.countDocuments();

        const totalPatients = await Patient.countDocuments();

        const totalAppointments = await Appointment.countDocuments();

        const totalBills = await Billing.countDocuments();

        const bills = await Billing.find();

        const totalRevenue = bills.reduce(
            (sum, bill) => sum + Number(bill.totalAmount || 0),
            0
        );

        const paidBills = await Billing.countDocuments({
            paymentStatus: "Paid",
        });

        const pendingBills = await Billing.countDocuments({
            paymentStatus: "Pending",
        });

        const recentAppointments = await Appointment.find()
            .populate("patient", "name")
            .populate("doctor", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        const recentBills = await Billing.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({

            success: true,

            reports: {
                totalDoctors,
                totalPatients,
                totalAppointments,
                totalBills,
                totalRevenue,
                paidBills,
                pendingBills,
                recentAppointments,
                recentBills,
            },

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};

module.exports = {
    getReports,
};