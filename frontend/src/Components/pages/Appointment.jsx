import { useState } from "react";
import api from "../../services/api";
import "../styles/Appointment.css";

function Appointment() {

    const [formData, setFormData] = useState({
        patientName: "",
        email: "",
        phone: "",
        doctor: "",
        appointmentDate: "",
        problem: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post("/appointments/add", formData);

            alert(res.data.message);

            setFormData({
                patientName: "",
                email: "",
                phone: "",
                doctor: "",
                appointmentDate: "",
                problem: "",
            });

        } catch (error) {

            alert(error.response?.data?.message || "Something went wrong");

        }
    };

    return (
        <div className="appointment">

            <h1>Book Appointment</h1>

            <form className="appointment-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required

                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required

                />

                <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                >
                    <option value="">Select Doctor</option>
                    <option>Dr. John Smith</option>
                    <option>Dr. Sarah Johnson</option>
                    <option>Dr. Michael Lee</option>
                </select>

                <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required

                />

                <textarea
                    rows="5"
                    name="problem"
                    placeholder="Describe Your Problem"
                    value={formData.problem}
                    onChange={handleChange}
                    required

                ></textarea>

                <button type="submit">
                    Book Appointment
                </button>

            </form>

        </div>
    );
}

export default Appointment;