import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import Loader from "./Loader";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

import "../styles/DashboardChart.css";

function DashboardChart() {

    const [loading, setLoading] = useState(true);

    const [chartData, setChartData] = useState({
        weeklyAppointments: [],
        patientDoctorData: [],
    });

    const COLORS = [
        "#2563EB",
        "#10B981",
    ];

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/analytics", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const analytics = res.data.analytics;

            setChartData({

                weeklyAppointments: [
                    { day: "Mon", appointments: analytics.monday || 0 },
                    { day: "Tue", appointments: analytics.tuesday || 0 },
                    { day: "Wed", appointments: analytics.wednesday || 0 },
                    { day: "Thu", appointments: analytics.thursday || 0 },
                    { day: "Fri", appointments: analytics.friday || 0 },
                    { day: "Sat", appointments: analytics.saturday || 0 },
                    { day: "Sun", appointments: analytics.sunday || 0 },
                ],

                patientDoctorData: [
                    {
                        name: "Doctors",
                        value: analytics.totalDoctors || 0,
                    },
                    {
                        name: "Patients",
                        value: analytics.totalPatients || 0,
                    },
                ],

            });

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load charts"
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <Loader />;
    }

    return (

        <div className="charts-container">

            <div className="chart-card">

                <h2>📈 Weekly Appointments</h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart data={chartData.weeklyAppointments}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="appointments"
                            fill="#2563EB"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div className="chart-card">

                <h2>🥧 Doctors vs Patients</h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <PieChart>

                        <Pie
                            data={chartData.patientDoctorData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            label
                        >

                            {chartData.patientDoctorData.map(
                                (entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default DashboardChart;