const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true,
        },

        doctorName: {
            type: String,
            required: true,
        },

        consultationFee: {
            type: Number,
            required: true,
        },

        medicineFee: {
            type: Number,
            default: 0,
        },

        labFee: {
            type: Number,
            default: 0,
        },

        otherFee: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Billing", billingSchema);