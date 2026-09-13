import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/Invoice.css";

function Invoice() {

    const { id } = useParams();

    const [bill, setBill] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [sending, setSending] = useState(false);
    const [showEmailBox, setShowEmailBox] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchBill();
    }, [id]);

    const fetchBill = async () => {

        try {

            const res = await api.get(`/billing/${id}`);

            setBill(res.data.bill);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to Load Invoice"
            );

        }

    };

    // Downloads the official, server-generated PDF (same one that
    // gets attached to invoice emails) instead of a screenshot.
    const downloadPDF = async () => {

        setDownloading(true);

        try {

            const res = await api.get(
                `/invoice/${id}?download=1`,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(
                new Blob([res.data], { type: "application/pdf" })
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `Invoice-${bill?._id || id}.pdf`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {

            toast.error("PDF Download Failed");

        } finally {

            setDownloading(false);

        }

    };

    const sendInvoiceEmail = async (e) => {

        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter an email address");
            return;
        }

        setSending(true);

        try {

            const res = await api.post(
                `/billing/send-email/${id}`,
                { email: email.trim() }
            );

            toast.success(res.data.message);
            setShowEmailBox(false);
            setEmail("");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Email Sending Failed"
            );

        } finally {

            setSending(false);

        }

    };

    if (!bill) {

        return (
            <h2 style={{ textAlign: "center" }}>
                Loading...
            </h2>
        );

    }

    return (

        <div className="invoice">

            <div className="invoice-card">

                <h1>🏥 SmartCare AI Hospital</h1>

                <h2>Invoice</h2>

                <hr />

                <p><strong>Patient :</strong> {bill.patientName}</p>

                <p><strong>Doctor :</strong> {bill.doctorName}</p>

                <p><strong>Consultation Fee :</strong> ₹ {bill.consultationFee}</p>

                <p><strong>Medicine Fee :</strong> ₹ {bill.medicineFee}</p>

                <p><strong>Lab Fee :</strong> ₹ {bill.labFee}</p>

                <p><strong>Other Charges :</strong> ₹ {bill.otherFee}</p>

                <hr />

                <h2>Total Amount : ₹ {bill.totalAmount}</h2>

                <p>
                    <strong>Payment Status :</strong>{" "}
                    {bill.paymentStatus}
                </p>

                <div className="button-group">

                    <button
                        className="print-btn"
                        onClick={() => window.print()}
                    >
                        🖨 Print Invoice
                    </button>

                    <button
                        className="pdf-btn"
                        onClick={downloadPDF}
                        disabled={downloading}
                    >
                        {downloading ? "Preparing..." : "📄 Download PDF"}
                    </button>

                    <button
                        className="email-btn"
                        onClick={() => setShowEmailBox((prev) => !prev)}
                    >
                        📧 Send Email
                    </button>

                </div>

                {showEmailBox && (

                    <form
                        className="email-box"
                        onSubmit={sendInvoiceEmail}
                    >

                        <input
                            type="email"
                            placeholder="Enter patient's email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button type="submit" disabled={sending}>
                            {sending ? "Sending..." : "Send"}
                        </button>

                    </form>

                )}

            </div>

        </div>

    );

}

export default Invoice;
