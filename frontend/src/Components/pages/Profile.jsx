import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { SERVER_URL } from "../../services/config";
import { toast } from "react-toastify";
import "../styles/Profile.css";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const res = await api.get("/users/profile");

            setUser(res.data.user);

        } catch (error) {

            console.error("Profile Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return (
            <h2 className="loading">
                Loading Profile...
            </h2>
        );
    }

    return (

        <div className="profile-container">

            <div className="profile-card">

                {/* =========================
                    Profile Image
                ========================= */}

                <img
                    src={
                        user?.profileImage
                            ? `${SERVER_URL}/uploads/profile/${user.profileImage}`
                            : "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="profile-image"
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://via.placeholder.com/150";
                    }}
                />

                {/* =========================
                    User Information
                ========================= */}

                <h2>
                    {user?.name || "User"}
                </h2>

                <p>
                    <strong>Email :</strong>{" "}
                    {user?.email || "Not Added"}
                </p>

                <p>
                    <strong>Phone :</strong>{" "}
                    {user?.phone || "Not Added"}
                </p>

                <p>
                    <strong>Address :</strong>{" "}
                    {user?.address || "Not Added"}
                </p>

                <p>
                    <strong>Gender :</strong>{" "}
                    {user?.gender || "Not Added"}
                </p>

                <p>
                    <strong>Date of Birth :</strong>{" "}
                    {user?.dateOfBirth
                        ? new Date(
                            user.dateOfBirth
                        ).toLocaleDateString()
                        : "Not Added"}
                </p>

                <p>
                    <strong>Role :</strong>{" "}
                    {user?.role || "Not Added"}
                </p>

                {/* =========================
                    Profile Actions
                ========================= */}

                <div className="profile-buttons">

                    <Link
                        to="/edit-profile"
                        className="edit-btn"
                    >
                        ✏️ Edit Profile
                    </Link>

                    <Link
                        to="/upload-profile-image"
                        className="upload-btn"
                    >
                        📷 Upload Image
                    </Link>

                    <Link
                        to="/change-password"
                        className="password-btn"
                    >
                        🔒 Change Password
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default Profile;