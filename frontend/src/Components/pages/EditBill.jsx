import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/EditBill.css";

function EditBill() {

    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        fetchBill();
    }, [id]);

    const fetchBill = async () => {

        try {

            const res = await api.get(`/billing/${id}`);

            setBill({
                patientName: res.data.bill.patientName || "",
                doctorName: res.data.bill.doctorName || "",
                consultationFee: res.data.bill.consultationFee || "",
                medicineFee: res.data.bill.medicineFee || "",
                labFee: res.data.bill.labFee || "",
                otherFee: res.data.bill.otherFee || "",
                paymentStatus: res.data.bill.paymentStatus || "Pending",
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to Load Bill"
            );

        }

    };

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

            const res = await api.put(
                `/billing/update/${id}`,
                {
                    ...bill,
                    totalAmount,
                }
            );

            toast.success(res.data.message);

            navigate("/billing");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="edit-bill">

            <form
                className="edit-bill-form"
                onSubmit={handleSubmit}
            >

                <h1>Edit Bill</h1>

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
                    <strong>Total Amount:</strong> ₹ {totalAmount}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Bill"}
                </button>

            </form>

        </div>

    );

}

export default EditBill;