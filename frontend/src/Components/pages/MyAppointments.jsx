import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/MyAppointments.css";

function MyAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchAppointments = async () => {

        try {

            const res = await api.get("/appointments/my-appointments");

            setAppointments(res.data.appointments);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load appointments");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAppointments();

    }, []);

    const filteredAppointments = appointments.filter((item) =>
        item.doctor?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="myAppointments">

            <h2>📅 My Appointments</h2>

            <input
                type="text"
                placeholder="Search Doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="searchBox"
            />

            {

                loading ?

                    <h3>Loading...</h3>

                    :

                    filteredAppointments.length === 0 ?

                        <h3>No Appointments Found</h3>

                        :

                        <div className="appointmentGrid">

                            {

                                filteredAppointments.map((item) => (

                                    <div
                                        className="appointmentCard"
                                        key={item._id}
                                    >

                                        <h3>
                                            👨‍⚕️ Dr. {item.doctor?.name}
                                        </h3>

                                        <p>
                                            <strong>Specialization :</strong>{" "}
                                            {item.doctor?.specialization}
                                        </p>

                                        <p>
                                            <strong>Date :</strong>{" "}
                                            {new Date(item.appointmentDate).toLocaleDateString()}
                                        </p>

                                        <p>
                                            <strong>Time :</strong>{" "}
                                            {item.appointmentTime}
                                        </p>

                                        <p>
                                            <strong>Reason :</strong>{" "}
                                            {item.reason}
                                        </p>

                                        <span
                                            className={`status ${item.status}`}
                                        >
                                            {item.status}
                                        </span>

                                    </div>

                                ))

                            }

                        </div>

            }

        </div>

    );

}

export default MyAppointments;