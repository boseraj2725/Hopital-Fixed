import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../../services/api";
import Loader from "./Loader";
import "../styles/BillList.css";

function BillList() {

    const navigate = useNavigate();

    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {

        setLoading(true);

        try {

            const res = await api.get("/billing");

            setBills(res.data.bills || []);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to Load Bills"
            );

        } finally {

            setLoading(false);

        }

    };

    const deleteBill = async (id) => {

        const result = await Swal.fire({
            title: "Delete Bill?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete",
        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/billing/delete/${id}`);

            toast.success("Bill Deleted Successfully");

            fetchBills();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    const filteredBills = bills.filter((bill) =>
        (bill.patientName || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return <Loader />;
    }

    return (

        <div className="bill-list">

            <h1>💳 Hospital Bills</h1>

            <input
                type="text"
                className="search-box"
                placeholder="🔍 Search Patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table>

                <thead>

                    <tr>

                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredBills.length > 0 ? (

                        filteredBills.map((bill) => (

                            <tr key={bill._id}>

                                <td>{bill.patientName}</td>

                                <td>{bill.doctorName}</td>

                                <td>₹ {bill.totalAmount}</td>

                                <td>

                                    <span
                                        className={
                                            bill.paymentStatus === "Paid"
                                                ? "paid"
                                                : "pending"
                                        }
                                    >
                                        {bill.paymentStatus}
                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            navigate(`/edit-bill/${bill._id}`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            navigate(`/invoice/${bill._id}`)
                                        }
                                    >
                                        Invoice
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteBill(bill._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                }}
                            >
                                No Bills Found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default BillList;