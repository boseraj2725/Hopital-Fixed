const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Billing = require("../models/Billing");

const getAnalytics = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();
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

        res.status(200).json({

            success: true,

            analytics: {

                totalUsers,
                totalDoctors,
                totalPatients,
                totalAppointments,
                totalBills,
                totalRevenue,
                paidBills,
                pendingBills,

                // Weekly Chart Data
                monday: 5,
                tuesday: 8,
                wednesday: 12,
                thursday: 10,
                friday: 15,
                saturday: 9,
                sunday: 4,

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
    getAnalytics,
};