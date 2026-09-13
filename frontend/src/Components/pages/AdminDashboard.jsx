import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import "../styles/AdminDashboard.css";
import Topbar from "../Topbar";
import RecentAppointments from "./RecentAppointments";
import RecentBills from "./RecentBills";
import QuickActions from "./QuickActions";

function AdminDashboard() {
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {

        const fetchNotifications = async () => {

            try {

                const res = await api.get("/notifications");

                setNotifications(res.data);

            } catch (error) {

                console.log("Notification Error:", error);

            }

        };


        fetchNotifications();

    }, []);
    return (

        <>
            <Sidebar />

            <div className="admin-content">
                <Topbar />
                <h1 className="dashboard-title">
                    🏥 Medlora Hospital - Admin Dashboard
                </h1>

                <DashboardStats />
                <DashboardChart />
                <RecentAppointments />
                <RecentBills />
                <QuickActions />

                <div className="dashboard-grid">

                    <Link to="/doctors" className="dashboard-card">
                        <h2>👨‍⚕️ Doctors</h2>
                        <p>View & Manage Doctors</p>
                    </Link>

                    <Link to="/patients" className="dashboard-card">
                        <h2>🧑 Patients</h2>
                        <p>View & Manage Patients</p>
                    </Link>

                    <Link to="/add-appointment" className="dashboard-card">
                        <h2>📅 Book Appointment</h2>
                        <p>Create New Appointment</p>
                    </Link>

                    <Link to="/appointments" className="dashboard-card">
                        <h2>📋 Appointment List</h2>
                        <p>Manage All Appointments</p>
                    </Link>

                    <Link to="/add-doctor" className="dashboard-card">
                        <h2>➕ Add Doctor</h2>
                        <p>Register New Doctor</p>
                    </Link>

                    <Link to="/add-patient" className="dashboard-card">
                        <h2>➕ Add Patient</h2>
                        <p>Register New Patient</p>
                    </Link>

                    <Link to="/analytics" className="dashboard-card">
                        <h2>📊 Analytics</h2>
                        <p>Hospital Reports & Charts</p>
                    </Link>

                    <Link to="/billing" className="dashboard-card">
                        <h2>💳 Billing</h2>
                        <p>Hospital Billing System</p>
                    </Link>

                    <Link to="/add-bill" className="dashboard-card">
                        <h2>➕ Create Bill</h2>
                        <p>Create Patient Bill</p>
                    </Link>

                </div>

            </div>
        </>
    );
}

export default AdminDashboard;