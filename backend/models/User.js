const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
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

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["Admin", "Doctor", "Patient"],
            default: "Patient",
        },

        phone: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
            trim: true,
        },

        gender: {
            type: String,
            trim: true,
        },

        dateOfBirth: {
            type: Date,
        },

        profileImage: {
            type: String,
            default: "default-profile.png",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);