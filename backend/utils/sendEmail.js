const nodemailer = require("nodemailer");

let cachedTransporter = null;

const getTransporter = () => {
    if (!cachedTransporter) {
        cachedTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    return cachedTransporter;
};

/**
 * Send an email. Supports both the original simple signature and an
 * options object for HTML content + attachments.
 *
 *   sendEmail(to, subject, text)
 *   sendEmail(to, subject, text, { html, attachments })
 */
const sendEmail = async (to, subject, text, options = {}) => {
    try {
        const transporter = getTransporter();

        await transporter.sendMail({
            from: `"SmartCare AI Hospital" <${process.env.EMAIL}>`,
            to,
            subject,
            text,
            html: options.html,
            attachments: options.attachments,
        });

        console.log("Email Sent Successfully");

        return true;
    } catch (error) {
        console.log("Email Send Failed:", error.message);

        // Re-throw so calling controllers can report the failure
        // to the user instead of silently returning "success".
        throw error;
    }
};

module.exports = sendEmail;
