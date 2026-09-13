const { PassThrough } = require("stream");
const Billing = require("../models/Billing");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const { buildInvoicePDF, formatMoney, formatDate } = require("../utils/generateInvoicePdf");

// Collects the streamed invoice PDF into an in-memory Buffer so it
// can be attached to an email instead of piped to an HTTP response.
const buildInvoicePdfBuffer = (bill) =>
    new Promise((resolve, reject) => {
        const stream = new PassThrough();
        const chunks = [];

        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);

        buildInvoicePDF(bill, stream);
    });

const isValidEmail = (email) =>
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ===============================
// Add Bill
// ===============================
const addBill = async (req, res) => {

    try {

        const {
            patientName,
            doctorName,
            consultationFee,
            medicineFee,
            labFee,
            otherFee,
            paymentStatus,
        } = req.body;

        const totalAmount =
            Number(consultationFee) +
            Number(medicineFee) +
            Number(labFee) +
            Number(otherFee);

        const bill = new Billing({

            patientName,

            doctorName,

            consultationFee,

            medicineFee,

            labFee,

            otherFee,

            totalAmount,

            paymentStatus,

        });

        await bill.save();

        // Create Notification
        const notification = await Notification.create({

            title: "New Bill Created",

            message: `Bill created for ${bill.patientName}.`,

            role: "Admin",

        });

        // Live Notification
        const io = req.app.get("io");

        if (io) {

            io.emit("newNotification", notification);

        }

        res.status(201).json({

            success: true,

            message: "Bill Created Successfully",

            bill,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ===============================
// Get All Bills
// ===============================
const getBills = async (req, res) => {

    try {

        const bills = await Billing.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            bills,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ===============================
// Get Single Bill
// ===============================
const getBillById = async (req, res) => {

    try {

        const bill = await Billing.findById(req.params.id);

        if (!bill) {

            return res.status(404).json({
                success: false,
                message: "Bill Not Found",
            });

        }

        res.status(200).json({
            success: true,
            bill,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ===============================
// Update Bill
// ===============================
const updateBill = async (req, res) => {

    try {

        const {
            consultationFee,
            medicineFee,
            labFee,
            otherFee,
        } = req.body;

        req.body.totalAmount =
            Number(consultationFee) +
            Number(medicineFee) +
            Number(labFee) +
            Number(otherFee);

        const bill = await Billing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!bill) {

            return res.status(404).json({
                success: false,
                message: "Bill Not Found",
            });

        }

        res.status(200).json({
            success: true,
            message: "Bill Updated Successfully",
            bill,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ===============================
// Delete Bill
// ===============================
const deleteBill = async (req, res) => {

    try {

        const bill = await Billing.findByIdAndDelete(req.params.id);

        if (!bill) {

            return res.status(404).json({
                success: false,
                message: "Bill Not Found",
            });

        }

        // Create Notification
        const notification = await Notification.create({

            title: "Bill Deleted",

            message: `Bill for ${bill.patientName} has been deleted.`,

            role: "Admin",

        });

        // Live Notification
        const io = req.app.get("io");

        if (io) {

            io.emit("newNotification", notification);

        }

        res.status(200).json({

            success: true,

            message: "Bill Deleted Successfully",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ===============================
// Send Invoice Email
// ===============================
const sendInvoiceEmail = async (req, res) => {

    try {

        const { email } = req.body;

        if (!isValidEmail(email)) {

            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });

        }

        const bill = await Billing.findById(req.params.id);

        if (!bill) {

            return res.status(404).json({
                success: false,
                message: "Bill Not Found",
            });

        }

        const invoiceNumber = `INV-${String(bill._id).slice(-8).toUpperCase()}`;
        const statusColor = bill.paymentStatus === "Paid" ? "#16a34a" : "#d97706";

        const plainTextFallback = `
SmartCare AI Hospital - Invoice ${invoiceNumber}

Patient Name : ${bill.patientName}
Doctor Name  : ${bill.doctorName}

Consultation Fee : ${formatMoney(bill.consultationFee)}
Medicine Fee     : ${formatMoney(bill.medicineFee)}
Lab Fee          : ${formatMoney(bill.labFee)}
Other Fee        : ${formatMoney(bill.otherFee)}

Total Amount     : ${formatMoney(bill.totalAmount)}
Payment Status   : ${bill.paymentStatus}

Thank you for choosing SmartCare AI Hospital.
`;

        const html = `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background:#2563eb; padding: 20px 24px; color:#ffffff;">
                <h2 style="margin:0; font-size: 20px;">SmartCare AI Hospital</h2>
                <p style="margin:4px 0 0; font-size: 13px; color:#dbeafe;">Invoice ${invoiceNumber} &middot; ${formatDate(bill.createdAt)}</p>
            </div>
            <div style="padding: 24px;">
                <p style="margin-top:0;">Dear ${bill.patientName},</p>
                <p>Please find your invoice details below. A PDF copy is attached to this email for your records.</p>

                <table style="width:100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
                    <tr>
                        <td style="padding:6px 0; color:#6b7280;">Doctor</td>
                        <td style="padding:6px 0; text-align:right;">Dr. ${bill.doctorName}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7280;">Consultation Fee</td>
                        <td style="padding:6px 0; text-align:right;">${formatMoney(bill.consultationFee)}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7280;">Medicine Fee</td>
                        <td style="padding:6px 0; text-align:right;">${formatMoney(bill.medicineFee)}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7280;">Lab Fee</td>
                        <td style="padding:6px 0; text-align:right;">${formatMoney(bill.labFee)}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7280;">Other Charges</td>
                        <td style="padding:6px 0; text-align:right;">${formatMoney(bill.otherFee)}</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 0; border-top:1px solid #e5e7eb; font-weight:bold;">Total Amount</td>
                        <td style="padding:10px 0; border-top:1px solid #e5e7eb; text-align:right; font-weight:bold;">${formatMoney(bill.totalAmount)}</td>
                    </tr>
                </table>

                <p>
                    Payment Status:
                    <span style="display:inline-block; padding:3px 10px; border-radius:4px; background:${statusColor}; color:#ffffff; font-size:12px; font-weight:bold;">
                        ${bill.paymentStatus.toUpperCase()}
                    </span>
                </p>

                <p style="margin-top:24px; color:#6b7280; font-size:13px;">Thank you for choosing SmartCare AI Hospital.</p>
            </div>
        </div>
        `;

        const pdfBuffer = await buildInvoicePdfBuffer(bill);

        await sendEmail(
            email,
            `Your Invoice ${invoiceNumber} - SmartCare AI Hospital`,
            plainTextFallback,
            {
                html,
                attachments: [
                    {
                        filename: `${invoiceNumber}.pdf`,
                        content: pdfBuffer,
                        contentType: "application/pdf",
                    },
                ],
            }
        );

        res.status(200).json({

            success: true,

            message: `Invoice emailed to ${email} successfully.`,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message || "Failed to send invoice email.",

        });

    }

};

// ===============================
// Export
// ===============================
module.exports = {

    addBill,

    getBills,

    getBillById,

    updateBill,

    deleteBill,

    sendInvoiceEmail,

};