import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/EditPatient.css";

function EditPatient() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [patient, setPatient] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        fetchPatient();
    }, [id]);

    const fetchPatient = async () => {
        try {
            const res = await api.get(`/patients/${id}`);

            setPatient({
                name: res.data.patient.name || "",
                age: res.data.patient.age || "",
                gender: res.data.patient.gender || "",
                phone: res.data.patient.phone || "",
                email: res.data.patient.email || "",
                address: res.data.patient.address || "",
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to load patient details"
            );
        }
    };

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await api.put(`/patients/update/${id}`, patient);

            toast.success(res.data.message);

            navigate("/patients");

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
        <div className="edit-patient">

            <form onSubmit={handleSubmit}>

                <h1>Edit Patient</h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={patient.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={patient.age}
                    onChange={handleChange}
                    required
                />

                <select
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={patient.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={patient.email}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    value={patient.address}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Patient"}
                </button>

            </form>

        </div>
    );
}

export default EditPatient;