import { useEffect, useState } from "react";
import api from "../../services/api";
import "../styles/Analytics.css";
import { toast } from "react-toastify";
import Loader from "./Loader";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Analytics() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDoctors: 0,
        totalPatients: 0,
        totalAppointments: 0,
        totalBills: 0,
        totalRevenue: 0,
        paidBills: 0,
        pendingBills: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/analytics", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStats(res.data.analytics);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load analytics"
            );

        } finally {

            setLoading(false);

        }

    };

    const chartData = {

        labels: [
            "Users",
            "Doctors",
            "Patients",
            "Appointments",
            "Bills",
        ],

        datasets: [

            {

                label: "Hospital Statistics",

                data: [

                    stats.totalUsers,
                    stats.totalDoctors,
                    stats.totalPatients,
                    stats.totalAppointments,
                    stats.totalBills,

                ],

                backgroundColor: [

                    "#3B82F6",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",

                ],

                borderRadius: 8,

            },

        ],

    };

    if (loading) {
        return <Loader />;
    }

    return (

        <div className="analytics-container">

            <h1>📊 Medlora Hospital Analytics Dashboard</h1>

            <div className="analytics-grid">

                <div className="1card users">
                    <h2>👥 Total Users</h2>
                    <h1>{stats.totalUsers}</h1>
                </div>

                <div className="1card doctors">
                    <h2>👨‍⚕️ Total Doctors</h2>
                    <h1>{stats.totalDoctors}</h1>
                </div>

                <div className="1card patients">
                    <h2>🧑 Total Patients</h2>
                    <h1>{stats.totalPatients}</h1>
                </div>

                <div className="1card appointments">
                    <h2>📅 Appointments</h2>
                    <h1>{stats.totalAppointments}</h1>
                </div>

                <div className="1card bills">
                    <h2>💳 Total Bills</h2>
                    <h1>{stats.totalBills}</h1>
                </div>

                <div className="1card revenue">
                    <h2>💰 Total Revenue</h2>
                    <h1>₹ {stats.totalRevenue}</h1>
                </div>

                <div className="card paid">
                    <h2>✅ Paid Bills</h2>
                    <h1>{stats.paidBills}</h1>
                </div>

                <div className="card pending">
                    <h2>⏳ Pending Bills</h2>
                    <h1>{stats.pendingBills}</h1>
                </div>

            </div>

            <div className="chart-container">

                <h2>📈 Hospital Statistics</h2>

                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                            title: {
                                display: true,
                                text: "SmartCare AI Analytics Dashboard",
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />

            </div>

        </div>

    );

}

export default Analytics;