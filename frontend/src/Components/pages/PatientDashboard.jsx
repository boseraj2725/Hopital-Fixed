import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "../styles/PatientDashboard.css";

function PatientDashboard() {

    const [user, setUser] = useState(null);

    const [stats, setStats] = useState({
        appointments: 0,
        reports: 0,
        prescriptions: 0,
        bills: 0,
    });

    useEffect(() => {

        fetchProfile();
        fetchDashboard();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await api.get("/users/profile");

            setUser(res.data.user);

        } catch (error) {

            toast.error("Failed to load profile");

        }

    };

    const fetchDashboard = async () => {

        try {

            const res = await api.get("/patient/dashboard");

            setStats({

                appointments: res.data.appointments || 0,
                reports: res.data.reports || 0,
                prescriptions: res.data.prescriptions || 0,
                bills: res.data.bills || 0,

            });

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="patient-dashboard">

            <div className="welcome-card">

                <h1>
                    Welcome,
                    {user?.name || "Patient"} 👋
                </h1>

                <p>
                    Manage your appointments,
                    reports and prescriptions.
                </p>

            </div>

            <div className="dashboard-cards">

                <div className="card">
                    <h2>📅 Appointments</h2>
                    <h1>{stats.appointments}</h1>
                </div>

                <div className="card">
                    <h2>📄 Reports</h2>
                    <h1>{stats.reports}</h1>
                </div>

                <div className="card">
                    <h2>💊 Prescriptions</h2>
                    <h1>{stats.prescriptions}</h1>
                </div>

                <div className="card">
                    <h2>💳 Bills</h2>
                    <h1>{stats.bills}</h1>
                </div>

            </div>

            <div className="quick-actions">

                <Link
                    to="/book-appointment"
                    className="action-btn"
                >
                    📅 Book Appointment
                </Link>

                <Link
                    to="/appointments"
                    className="action-btn"
                >
                    📋 My Appointments
                </Link>

                <Link
                    to="/profile"
                    className="action-btn"
                >
                    👤 My Profile
                </Link>

                <Link
                    to="/notifications"
                    className="action-btn"
                >
                    🔔 Notifications
                </Link>

                <Link
                    to="/billing"
                    className="action-btn"
                >
                    💳 My Bills
                </Link>

            </div>

        </div>

    );

}

export default PatientDashboard;