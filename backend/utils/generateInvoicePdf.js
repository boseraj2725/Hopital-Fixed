const PDFDocument = require("pdfkit");

// ==========================================================
// Shared Invoice PDF Builder
// Used by: invoiceController (download/view) and
//          billingController (email attachment)
// ==========================================================

const CURRENCY = "Rs.";

const formatMoney = (value) =>
    `${CURRENCY} ${Number(value || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const formatDate = (date) =>
    new Date(date || Date.now()).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

/**
 * Builds a polished invoice PDF for a given bill and streams it
 * into the provided writable stream (an HTTP response, or a
 * PassThrough stream if you want to collect it into a Buffer).
 *
 * @param {Object} bill - Mongoose Billing document
 * @param {NodeJS.WritableStream} destination - where to pipe the PDF
 * @returns {PDFDocument} the document (already piped; caller should not re-pipe)
 */
function buildInvoicePDF(bill, destination) {
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    doc.pipe(destination);

    const pageWidth = doc.page.width;
    const marginX = 50;
    const contentWidth = pageWidth - marginX * 2;

    const brandColor = "#2563eb";
    const darkText = "#1f2937";
    const mutedText = "#6b7280";
    const borderColor = "#e5e7eb";

    const invoiceNumber = `INV-${String(bill._id).slice(-8).toUpperCase()}`;
    const issuedDate = formatDate(bill.createdAt);
    const isPaid = bill.paymentStatus === "Paid";

    // ---------------- Header band ----------------
    doc.rect(0, 0, pageWidth, 110).fill(brandColor);

    doc
        .fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(22)
        .text("SmartCare AI Hospital", marginX, 34);

    doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#dbeafe")
        .text(
            "123 Wellness Avenue, Coimbatore, Tamil Nadu | +91 98765 43210 | care@smartcarehospital.com",
            marginX,
            62,
            { width: contentWidth - 160 }
        );

    doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor("#ffffff")
        .text("INVOICE", marginX, 30, { width: contentWidth, align: "right" });

    doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#dbeafe")
        .text(`No: ${invoiceNumber}`, marginX, 56, {
            width: contentWidth,
            align: "right",
        })
        .text(`Date: ${issuedDate}`, marginX, 71, {
            width: contentWidth,
            align: "right",
        });

    // ---------------- Bill To / Attended By ----------------
    let y = 140;

    doc
        .fillColor(mutedText)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("BILL TO", marginX, y);

    doc
        .fillColor(mutedText)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("ATTENDED BY", marginX + contentWidth / 2, y);

    y += 16;

    doc
        .fillColor(darkText)
        .font("Helvetica-Bold")
        .fontSize(13)
        .text(bill.patientName || "-", marginX, y);

    doc
        .fillColor(darkText)
        .font("Helvetica-Bold")
        .fontSize(13)
        .text(`Dr. ${bill.doctorName || "-"}`, marginX + contentWidth / 2, y);

    y += 30;

    // ---------------- Charges table ----------------
    const rows = [
        ["Consultation Fee", bill.consultationFee],
        ["Medicine Fee", bill.medicineFee],
        ["Lab Fee", bill.labFee],
        ["Other Charges", bill.otherFee],
    ];

    const col1X = marginX;
    const col2X = marginX + contentWidth - 150;
    const rowHeight = 26;

    // table header
    doc.rect(marginX, y, contentWidth, rowHeight).fill("#f3f4f6");
    doc
        .fillColor(darkText)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text("Description", col1X + 10, y + 8)
        .text("Amount", col2X, y + 8, { width: 140, align: "right" });

    y += rowHeight;

    rows.forEach(([label, amount], idx) => {
        if (idx % 2 === 1) {
            doc.rect(marginX, y, contentWidth, rowHeight).fill("#fafafa");
        }

        doc
            .fillColor(darkText)
            .font("Helvetica")
            .fontSize(11)
            .text(label, col1X + 10, y + 8)
            .text(formatMoney(amount), col2X, y + 8, {
                width: 140,
                align: "right",
            });

        y += rowHeight;
    });

    // border under table
    doc
        .moveTo(marginX, y)
        .lineTo(marginX + contentWidth, y)
        .strokeColor(borderColor)
        .stroke();

    y += 16;

    // ---------------- Total ----------------
    doc.rect(marginX, y, contentWidth, 40).fill(brandColor);

    doc
        .fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("TOTAL AMOUNT", col1X + 10, y + 12)
        .text(formatMoney(bill.totalAmount), col2X, y + 12, {
            width: 140,
            align: "right",
        });

    y += 60;

    // ---------------- Payment status badge ----------------
    doc
        .fillColor(mutedText)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("PAYMENT STATUS", marginX, y);

    y += 16;

    const badgeColor = isPaid ? "#16a34a" : "#d97706";
    const badgeText = isPaid ? "PAID" : "PENDING";

    doc.roundedRect(marginX, y, 80, 22, 4).fill(badgeColor);
    doc
        .fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(badgeText, marginX, y + 6, { width: 80, align: "center" });

    // ---------------- Footer ----------------
    const footerY = doc.page.height - 100;

    doc
        .moveTo(marginX, footerY)
        .lineTo(marginX + contentWidth, footerY)
        .strokeColor(borderColor)
        .stroke();

    doc
        .fillColor(mutedText)
        .font("Helvetica")
        .fontSize(9)
        .text(
            "Thank you for choosing SmartCare AI Hospital. This is a system-generated invoice and does not require a signature.",
            marginX,
            footerY + 12,
            { width: contentWidth, align: "center" }
        );

    doc.end();

    return doc;
}

module.exports = { buildInvoicePDF, formatMoney, formatDate };
