import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../styles/RecentBills.css";

function RecentBills() {

    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {

        try {

            const res = await api.get("/billing");

            setBills(res.data.bills || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="recent-bills">
                <h2>Loading...</h2>
            </div>
        );

    }

    return (

        <div className="recent-bills">

            <div className="recent-header">

                <h2>💳 Recent Bills</h2>

                <Link
                    to="/billing"
                    className="view-all-btn"
                >
                    View All
                </Link>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice</th>

                    </tr>

                </thead>

                <tbody>

                    {bills.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                style={{ textAlign: "center" }}
                            >
                                No Bills Found
                            </td>

                        </tr>

                    ) : (

                        bills
                            .slice(0, 5)
                            .map((bill) => (

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

                                        <Link
                                            to={`/invoice/${bill._id}`}
                                            className="invoice-btn"
                                        >
                                            View
                                        </Link>

                                    </td>

                                </tr>

                            ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default RecentBills;