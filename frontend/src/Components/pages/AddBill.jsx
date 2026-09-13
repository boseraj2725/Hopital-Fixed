import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/Billing.css";

function AddBill() {

    const [loading, setLoading] = useState(false);

    const [bill, setBill] = useState({
        patientName: "",
        doctorName: "",
        consultationFee: "",
        medicineFee: "",
        labFee: "",
        otherFee: "",
        paymentStatus: "Pending",
    });

    const handleChange = (e) => {
        setBill({
            ...bill,
            [e.target.name]: e.target.value,
        });
    };

    const totalAmount =
        Number(bill.consultationFee || 0) +
        Number(bill.medicineFee || 0) +
        Number(bill.labFee || 0) +
        Number(bill.otherFee || 0);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await api.post("/billing/add", {
                ...bill,
                totalAmount,
            });

            toast.success(res.data.message);

            setBill({
                patientName: "",
                doctorName: "",
                consultationFee: "",
                medicineFee: "",
                labFee: "",
                otherFee: "",
                paymentStatus: "Pending",
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to Create Bill"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="billing-page">

            <form
                className="billing-form"
                onSubmit={handleSubmit}
            >

                <h1>Create Bill</h1>

                <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={bill.patientName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="doctorName"
                    placeholder="Doctor Name"
                    value={bill.doctorName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="consultationFee"
                    placeholder="Consultation Fee"
                    value={bill.consultationFee}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="medicineFee"
                    placeholder="Medicine Fee"
                    value={bill.medicineFee}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="labFee"
                    placeholder="Lab Fee"
                    value={bill.labFee}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="otherFee"
                    placeholder="Other Charges"
                    value={bill.otherFee}
                    onChange={handleChange}
                />

                <select
                    name="paymentStatus"
                    value={bill.paymentStatus}
                    onChange={handleChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                </select>

                <div className="total-box">
                    <strong>Total Amount :</strong> ₹ {totalAmount}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Bill"}
                </button>

            </form>

        </div>

    );
}

export default AddBill;