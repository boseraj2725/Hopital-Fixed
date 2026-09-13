import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/ChangePassword.css";

function ChangePassword() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
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

        if (form.newPassword !== form.confirmPassword) {

            return toast.error("Passwords do not match");

        }

        if (form.newPassword.length < 6) {

            return toast.error(
                "Password must be at least 6 characters"
            );

        }

        setLoading(true);

        try {

            const res = await api.put(
                "/users/change-password",
                {
                    oldPassword: form.oldPassword,
                    newPassword: form.newPassword,
                }
            );

            toast.success(
                res.data.message ||
                "Password Changed Successfully"
            );

            setForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setTimeout(() => {

                navigate("/profile");

            }, 1200);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to Change Password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="change-password-container">

            <form
                className="change-password-form"
                onSubmit={handleSubmit}
            >

                <h2>🔒 Change Password</h2>

                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Current Password"
                    value={form.oldPassword}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={form.newPassword}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Updating..."
                        : "Change Password"}
                </button>

            </form>

        </div>

    );

}

export default ChangePassword;