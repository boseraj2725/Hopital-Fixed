import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../styles/Settings.css";

function Settings() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
    });

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleProfileChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    // ==========================
    // Update Profile
    // ==========================
    const updateProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.put(
                "/users/update-profile",
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setProfile({
                name: res.data.user.name,
                email: res.data.user.email,
                phone: res.data.user.phone || "",
                role: res.data.user.role,
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Profile Update Failed"
            );

        }

    };

    // ==========================
    // Change Password
    // ==========================
    const changePassword = async () => {

        if (password.newPassword !== password.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {

            const token = localStorage.getItem("token");

            const res = await api.put(
                "/users/change-password",
                {
                    oldPassword: password.oldPassword,
                    newPassword: password.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);

            setPassword({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Password Change Failed"
            );

        }

    };

    // ==========================
    // Logout
    // ==========================
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div className="settings-container">

            <h1>⚙️ Account Settings</h1>

            <div className="profile-card">

                <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="profile"
                />

                <h2>{profile.name}</h2>

                <p>{profile.role}</p>

            </div>

            <div className="settings-grid">

                <div className="settings-box">

                    <h2>👤 Profile</h2>

                    <input
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        placeholder="Name"
                    />

                    <input
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        placeholder="Email"
                    />

                    <input
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        placeholder="Phone"
                    />

                    <button onClick={updateProfile}>
                        Save Profile
                    </button>

                </div>

                <div className="settings-box">

                    <h2>🔒 Change Password</h2>

                    <input
                        type="password"
                        name="oldPassword"
                        value={password.oldPassword}
                        onChange={handlePasswordChange}
                        placeholder="Old Password"
                    />

                    <input
                        type="password"
                        name="newPassword"
                        value={password.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="New Password"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        value={password.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm Password"
                    />

                    <button onClick={changePassword}>
                        Update Password
                    </button>

                </div>

            </div>

            <button
                className="logout-btn"
                onClick={logout}
            >
                🚪 Logout
            </button>

        </div>

    );

}

export default Settings;