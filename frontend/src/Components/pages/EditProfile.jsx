import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/EditProfile.css";

function EditProfile() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        dateOfBirth: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const res = await api.get("/users/profile");

            const user = res.data.user;

            setForm({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                gender: user.gender || "",
                dateOfBirth: user.dateOfBirth
                    ? user.dateOfBirth.substring(0, 10)
                    : "",
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const res = await api.put(
                "/users/update-profile",
                form
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            toast.success(
                res.data.message ||
                "Profile Updated Successfully"
            );

            navigate(-1);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <h2 className="loading">
                Loading...
            </h2>
        );

    }

    return (

        <div className="edit-profile-container">

            <form
                className="edit-profile-form"
                onSubmit={handleSubmit}
            >

                <h2>Edit Profile</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
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
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving
                        ? "Updating..."
                        : "Update Profile"}
                </button>

            </form>

        </div>

    );

}

export default EditProfile;