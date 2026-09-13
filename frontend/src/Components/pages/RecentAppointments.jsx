import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../styles/RecentAppointments.css";

function RecentAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {

        try {

            const res = await api.get("/appointments");

            setAppointments(res.data.appointments || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return (
            <div className="recent-appointments">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (

        <div className="recent-appointments">

            <div className="recent-header">

                <h2>📅 Recent Appointments</h2>

                <Link
                    to="/appointments"
                    className="view-all-btn"
                >
                    View All
                </Link>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {appointments.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                style={{ textAlign: "center" }}
                            >
                                No Appointments Found
                            </td>

                        </tr>

                    ) : (

                        appointments
                            .slice(0, 5)
                            .map((item) => (

                                <tr key={item._id}>

                                    <td>{item.patient?.name}</td>

                                    <td>{item.doctor?.name}</td>

                                    <td>
                                        {new Date(
                                            item.appointmentDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <span
                                            className={`status ${item.status.toLowerCase()}`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td>

                                        <Link
                                            to={`/edit-appointment/${item._id}`}
                                            className="view-btn"
                                        >
                                            Edit
                                        </Link>

                                    </td>

                                </tr>

                            ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default RecentAppointments;