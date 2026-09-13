import { useEffect, useState } from "react";
import {
    Users,
    UserRound,
    CalendarDays,
    Receipt,
    IndianRupee,
} from "lucide-react";
import { toast } from "react-toastify";

import api from "../../services/api";
import socket from "../../services/socket";
import Loader from "./Loader";
import "../styles/DashboardStats.css";

function DashboardStats() {

    const [stats, setStats] = useState({
        doctors: 0,
        patients: 0,
        appointments: 0,
        bills: 0,
        revenue: 0,
    });

    const [loading, setLoading] = useState(true);

    // ==========================
    // Fetch Dashboard Stats
    // ==========================
    const fetchStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStats({
                doctors: res.data.doctors || 0,
                patients: res.data.patients || 0,
                appointments: res.data.appointments || 0,
                bills: res.data.bills || 0,
                revenue: res.data.revenue || 0,
            });

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Initial Load + Live Updates
    // ==========================
    useEffect(() => {

        fetchStats();

        socket.on("newNotification", () => {

            fetchStats();

        });

        return () => {

            socket.off("newNotification");

        };

    }, []);

    if (loading) {
        return <Loader />;
    }

    return (

        <div className="dashboard-stats">

            <h1 className="stats-title">
                📊 Medlora Hospital Dashboard
            </h1>

            <div className="stats-grid">

                <div className="stats-card doctors">

                    <Users size={45} />

                    <div>
                        <h2>{stats.doctors}</h2>
                        <p>Total Doctors</p>
                    </div>

                </div>

                <div className="stats-card patients">

                    <UserRound size={45} />

                    <div>
                        <h2>{stats.patients}</h2>
                        <p>Total Patients</p>
                    </div>

                </div>

                <div className="stats-card appointments">

                    <CalendarDays size={45} />

                    <div>
                        <h2>{stats.appointments}</h2>
                        <p>Total Appointments</p>
                    </div>

                </div>

                <div className="stats-card bills">

                    <Receipt size={45} />

                    <div>
                        <h2>{stats.bills}</h2>
                        <p>Total Bills</p>
                    </div>

                </div>

                <div className="stats-card revenue">

                    <IndianRupee size={45} />

                    <div>
                        <h2>₹ {stats.revenue}</h2>
                        <p>Total Revenue</p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardStats;