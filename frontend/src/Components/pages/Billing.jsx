import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/BillList.css";

function BillList() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetchBills();
    }, []);

    // ==========================================
    // Fetch Bills
    // ==========================================

    const fetchBills = async () => {
        try {
            setLoading(true);

            const res = await api.get("/billing");

            setBills(res.data?.bills || []);
        } catch (error) {
            console.log("Fetch Bills Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to Load Bills"
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Delete Bill
    // ==========================================

    const deleteBill = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this bill?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `/billing/delete/${id}`
            );

            toast.success(
                "Bill Deleted Successfully"
            );

            fetchBills();
        } catch (error) {
            console.log(
                "Delete Bill Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );
        }
    };

    // ==========================================
    // Download Invoice
    // ==========================================

    const downloadInvoice = async (id) => {
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
            link.setAttribute("download", `Invoice-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Failed to download invoice");
        }
    };

    // ==========================================
    // Filter Bills
    // ==========================================

    const filteredBills = bills.filter((bill) => {
        const patientName =
            bill.patientName?.toLowerCase() || "";

        const doctorName =
            bill.doctorName?.toLowerCase() || "";

        const searchValue =
            search.toLowerCase();

        const matchesSearch =
            patientName.includes(searchValue) ||
            doctorName.includes(searchValue);

        const matchesStatus =
            statusFilter === "All" ||
            bill.paymentStatus === statusFilter;

        return (
            matchesSearch &&
            matchesStatus
        );
    });

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return (
            <div className="bill-loading">
                <div className="bill-spinner"></div>
                <p>Loading Bills...</p>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="bill-list">

            {/* Header */}

            <div className="bill-header">

                <div className="bill-title">

                    <div className="bill-icon">
                        💳
                    </div>

                    <div>
                        <h1>
                            Hospital Bills
                        </h1>

                        <p>
                            Manage patient billing
                            and invoices
                        </p>
                    </div>

                </div>

                <div className="bill-count">
                    <span>
                        Total Bills
                    </span>

                    <strong>
                        {bills.length}
                    </strong>
                </div>

            </div>

            {/* Filters */}

            <div className="bill-filters">

                <div className="bill-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search patient or doctor..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                >
                    <option value="All">
                        All Payments
                    </option>

                    <option value="Paid">
                        Paid
                    </option>

                    <option value="Pending">
                        Pending
                    </option>
                </select>

            </div>

            {/* Table */}

            <div className="bill-table-wrapper">

                <table className="bill-table">

                    <thead>

                        <tr>
                            <th>
                                Patient
                            </th>

                            <th>
                                Doctor
                            </th>

                            <th>
                                Total Amount
                            </th>

                            <th>
                                Payment Status
                            </th>

                            <th>
                                Actions
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredBills.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="no-bills"
                                >

                                    <div className="empty-icon">
                                        📄
                                    </div>

                                    <h3>
                                        No Bills Found
                                    </h3>

                                    <p>
                                        There are no bills
                                        matching your search.
                                    </p>

                                </td>

                            </tr>

                        ) : (

                            filteredBills.map(
                                (bill) => (

                                    <tr
                                        key={
                                            bill._id
                                        }
                                    >

                                        {/* Patient */}

                                        <td>

                                            <div className="patient-info">

                                                <div className="patient-avatar">
                                                    {bill.patientName
                                                        ?.charAt(
                                                            0
                                                        )
                                                        ?.toUpperCase() ||
                                                        "P"}
                                                </div>

                                                <div>

                                                    <strong>
                                                        {
                                                            bill.patientName ||
                                                            "Unknown Patient"
                                                        }
                                                    </strong>

                                                    <span>
                                                        Patient
                                                    </span>

                                                </div>

                                            </div>

                                        </td>

                                        {/* Doctor */}

                                        <td>

                                            <div className="doctor-info">

                                                <div className="doctor-avatar">
                                                    👨‍⚕️
                                                </div>

                                                <div>

                                                    <strong>
                                                        {
                                                            bill.doctorName ||
                                                            "Unknown Doctor"
                                                        }
                                                    </strong>

                                                    <span>
                                                        Medical Doctor
                                                    </span>

                                                </div>

                                            </div>

                                        </td>

                                        {/* Amount */}

                                        <td>

                                            <div className="bill-amount">

                                                ₹{" "}
                                                {Number(
                                                    bill.totalAmount ||
                                                    0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </div>

                                        </td>

                                        {/* Status */}

                                        <td>

                                            <span
                                                className={`payment-status ${
                                                    bill.paymentStatus
                                                        ?.toLowerCase() ===
                                                    "paid"
                                                        ? "paid"
                                                        : "pending"
                                                }`}
                                            >

                                                {bill.paymentStatus ===
                                                "Paid"
                                                    ? "✓ Paid"
                                                    : "⏳ Pending"}

                                            </span>

                                        </td>

                                        {/* Actions */}

                                        <td>

                                            <div className="bill-actions">

                                                <button
                                                    className="invoice-btn"
                                                    onClick={() =>
                                                        downloadInvoice(
                                                            bill._id
                                                        )
                                                    }
                                                >
                                                    📄 Invoice
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteBill(
                                                            bill._id
                                                        )
                                                    }
                                                >
                                                    🗑 Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default BillList;