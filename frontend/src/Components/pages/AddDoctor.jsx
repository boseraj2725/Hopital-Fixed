import { useState } from "react";
import api from "../../services/api";
import "../styles/AddDoctor.css";

function AddDoctor() {

    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        email: "",
        phone: "",
        experience: "",
        department: "",
    });

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const handleChange = (e) => {
        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const res = await api.post(
                "/doctors/add",
                doctor,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);

            setDoctor({
                name: "",
                specialization: "",
                email: "",
                phone: "",
                experience: "",
                department: "",
            });

        } catch (err) {

            alert(
                err.response?.data?.message || "Failed to Add Doctor"
            );

        }
    };

    return (
        <div className="add-doctor">

            <h1>Add Doctor</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Doctor Name"
                    value={doctor.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={doctor.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={doctor.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Experience (Years)"
                    value={doctor.experience}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={doctor.department}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Add Doctor
                </button>

            </form>

        </div>
    );
}

export default AddDoctor;