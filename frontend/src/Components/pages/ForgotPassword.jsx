import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/ForgotPassword.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email) {
            return toast.error("Please enter your email");
        }

        setLoading(true);

        try {

            const res = await api.post(
                "/forgot-password",
                { email }
            );

            toast.success(
                res.data.message ||
                "Password reset link sent successfully"
            );

            setEmail("");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to send reset link"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="forgot-container">

            <form
                className="forgot-form"
                onSubmit={handleSubmit}
            >

                <h2>🔑 Forgot Password</h2>

                <p className="forgot-text">
                    Enter your registered email address.
                    We'll send you a password reset link.
                </p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Sending..."
                        : "Send Reset Link"}
                </button>

                <div className="back-login">

                    <Link to="/login">
                        ← Back to Login
                    </Link>

                </div>

            </form>

        </div>

    );

}

export default ForgotPassword;