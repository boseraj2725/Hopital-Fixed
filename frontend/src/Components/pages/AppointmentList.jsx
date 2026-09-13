import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../../services/api";
import Loader from "./Loader";
import "../styles/AppointmentList.css";

function AppointmentList() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");


    // ==============================
    // Fetch Appointments
    // ==============================

    useEffect(() => {

        fetchAppointments();

    }, []);


    const fetchAppointments = async () => {

        setLoading(true);

        try {

            const res = await api.get("/appointments");

            setAppointments(
                res.data.appointments || []
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to Load Appointments"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==============================
    // Delete Appointment
    // ==============================

    const deleteAppointment = async (id) => {

        const result = await Swal.fire({

            title: "Delete Appointment?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            cancelButtonColor: "#3085d6",

            confirmButtonText: "Yes, Delete",

            cancelButtonText: "Cancel",

        });


        if (!result.isConfirmed) return;


        try {

            await api.delete(
                `/ appointments / delete/${id}`
            );


toast.success(
    "Appointment Deleted Successfully"
);


fetchAppointments();

        } catch (error) {

    toast.error(
        error.response?.data?.message ||
        "Delete Failed"
    );

}

    };


// ==============================
// Video Call
// ==============================

const startVideoCall = (appointmentId) => {

    if (!appointmentId) {

        toast.error(
            "Invalid appointment"
        );

        return;

    }


    navigate(
        `/video-call/${appointmentId}`
    );

};


// ==============================
// Share Meeting
// ==============================

const shareMeeting = (appointmentId) => {

    if (!appointmentId) {

        toast.error(
            "Invalid appointment"
        );

        return;

    }


    const meetingLink =
        `${window.location.origin}/video-call/${appointmentId}`;


    const message =
        `🏥 SmartCare AI Hospital\n\n` +
        `🎥 Video Consultation\n\n` +
        `Please join your consultation using this link:\n\n` +
        `${meetingLink}\n\n` +
        `Thank you.`;


    const whatsappUrl =
        `https://wa.me/?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
    );

};


// ==============================
// Filter
// ==============================

const filteredAppointments =
    appointments.filter((item) => {

        const patient =
            item.patient?.name?.toLowerCase() || "";


        const doctor =
            item.doctor?.name?.toLowerCase() || "";


        const searchText =
            search.toLowerCase();


        const matchesSearch =
            patient.includes(searchText) ||
            doctor.includes(searchText);


        const matchesStatus =
            statusFilter === "All" ||
            item.status === statusFilter;


        return (
            matchesSearch &&
            matchesStatus
        );

    });


// ==============================
// Loading
// ==============================

if (loading) {

    return <Loader />;

}


// ==============================
// UI
// ==============================

return (

    <div className="appointment-list">

        {/* Header */}

        <div className="appointment-list-header">

            <div>

                <h1>
                    📅 Appointments
                </h1>

                <p>
                    Manage hospital appointments
                    and video consultations
                </p>

            </div>

            <div className="appointment-count">

                {filteredAppointments.length}

                <span>
                    Appointments
                </span>

            </div>

        </div>


        {/* Filters */}

        <div className="filter-bar">

            <input
                type="text"
                className="search-box"
                placeholder="🔍 Search Patient or Doctor..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />


            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(
                        e.target.value
                    )
                }
            >

                <option value="All">
                    All Status
                </option>

                <option value="Pending">
                    Pending
                </option>

                <option value="Confirmed">
                    Confirmed
                </option>

                <option value="Completed">
                    Completed
                </option>

                <option value="Cancelled">
                    Cancelled
                </option>

            </select>

        </div>


        {/* Table */}

        <div className="appointment-table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            Patient
                        </th>

                        <th>
                            Doctor
                        </th>

                        <th>
                            Date
                        </th>

                        <th>
                            Time
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {filteredAppointments.length > 0 ? (

                        filteredAppointments.map(
                            (item) => (

                                <tr
                                    key={item._id}
                                >

                                    {/* Patient */}

                                    <td>

                                        <div className="patient-cell">

                                            <div className="patient-avatar">

                                                {item.patient?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "P"}

                                            </div>

                                            <div>

                                                <strong>
                                                    {item.patient?.name ||
                                                        "Unknown Patient"}
                                                </strong>

                                                <small>
                                                    Patient
                                                </small>

                                            </div>

                                        </div>

                                    </td>


                                    {/* Doctor */}

                                    <td>

                                        <div className="doctor-cell">

                                            👨‍⚕️

                                            <span>
                                                Dr.{" "}
                                                {item.doctor?.name ||
                                                    "Unknown Doctor"}
                                            </span>

                                        </div>

                                    </td>


                                    {/* Date */}

                                    <td>

                                        {item.appointmentDate
                                            ? new Date(
                                                item.appointmentDate
                                            ).toLocaleDateString()
                                            : "-"}

                                    </td>


                                    {/* Time */}

                                    <td>

                                        <span className="time-badge">

                                            🕐{" "}
                                            {item.appointmentTime ||
                                                "-"}

                                        </span>

                                    </td>


                                    {/* Status */}

                                    <td>

                                        <span
                                            className={`status ${item.status
                                                    ?.toLowerCase()
                                                    .replace(
                                                        /\s+/g,
                                                        "-"
                                                    ) || ""
                                                }`}
                                        >

                                            {item.status ||
                                                "Pending"}

                                        </span>

                                    </td>


                                    {/* Actions */}

                                    <td>

                                        <div className="action-buttons">


                                            {/* Edit */}

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-appointment/${item._id}`
                                                    )
                                                }
                                                title="Edit Appointment"
                                            >

                                                ✏️ Edit

                                            </button>


                                            {/* Video Call */}

                                            <button
                                                className="video-btn"
                                                onClick={() =>
                                                    startVideoCall(
                                                        item._id
                                                    )
                                                }
                                                title="Start Video Consultation"
                                            >

                                                🎥 Video

                                            </button>


                                            {/* Share */}

                                            <button
                                                className="share-btn"
                                                onClick={() =>
                                                    shareMeeting(
                                                        item._id
                                                    )
                                                }
                                                title="Share Meeting Link"
                                            >

                                                📱 Share

                                            </button>


                                            {/* Delete */}

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteAppointment(
                                                        item._id
                                                    )
                                                }
                                                title="Delete Appointment"
                                            >

                                                🗑️ Delete

                                            </button>


                                        </div>

                                    </td>

                                </tr>

                            )
                        )

                    ) : (

                        <tr>

                            <td
                                colSpan="6"
                                className="no-appointments"
                            >

                                <div>

                                    <div className="empty-icon">
                                        📅
                                    </div>

                                    <h3>
                                        No Appointments Found
                                    </h3>

                                    <p>
                                        Try changing your
                                        search or filter.
                                    </p>

                                </div>

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    </div>

);

}

export default AppointmentList;
