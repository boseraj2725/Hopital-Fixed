import { useState } from "react";
import api from "../../services/api";
import "../styles/AddPatient.css";

function AddPatient() {

    const [patient, setPatient] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
    });

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post("/patients/add", patient);

            alert(res.data.message);

            setPatient({
                name: "",
                age: "",
                gender: "",
                phone: "",
                email: "",
                address: "",
            });

        } catch (err) {

            alert(err.response?.data?.message || "Failed to Add Patient");

        }
    };

    return (
        <div className="add-patient">

            <form onSubmit={handleSubmit}>

                <h1>Add Patient</h1>

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

                <button type="submit">
                    Add Patient
                </button>

            </form>

        </div>
    );
}

export default AddPatient;