const Billing = require("../models/Billing");
const { buildInvoicePDF } = require("../utils/generateInvoicePdf");

// ==========================================================
// Generate / View / Download Invoice PDF
// GET /api/invoice/:id            -> view inline in browser
// GET /api/invoice/:id?download=1 -> force download
// ==========================================================
const generateInvoice = async (req, res) => {
    try {
        const bill = await Billing.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Bill Not Found",
            });
        }

        const invoiceNumber = `INV-${String(bill._id).slice(-8).toUpperCase()}`;
        const isDownload = req.query.download === "1" || req.query.download === "true";

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `${isDownload ? "attachment" : "inline"}; filename=${invoiceNumber}.pdf`
        );

        buildInvoicePDF(bill, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    generateInvoice,
};
