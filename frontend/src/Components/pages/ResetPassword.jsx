import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/ResetPassword.css";

function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        if (form.password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        setLoading(true);

        try {

            const res = await api.post(
                `/forgot-password/reset/${token}`,
                {
                    password: form.password,
                }
            );

            toast.success(
                res.data.message || "Password Reset Successfully"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Reset Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="reset-container">

            <form
                className="reset-form"
                onSubmit={handleSubmit}
            >

                <h2>🔐 Reset Password</h2>

                <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

            </form>

        </div>

    );

}

export default ResetPassword;