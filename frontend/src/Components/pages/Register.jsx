import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "patient",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post("/auth/register", form);

            alert(res.data.message);

            navigate("/login");

        } catch (err) {

            alert(
                err.response?.data?.message || "Registration Failed"
            );

        }
    };

    return (
        <div className="register-container">

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <h2>Create Account</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;