const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        age: {
            type: Number,
            required: true,
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        // Optional Fields
        bloodGroup: {
            type: String,
            default: "",
        },

        disease: {
            type: String,
            default: "",
        },

        doctor: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Active", "Discharged"],
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Patient", patientSchema);