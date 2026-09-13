import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/BookAppointment.css";

function BookAppointment() {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedDoctor = location.state?.doctor;

    /* =========================================
       Logged-in Patient
    ========================================= */

    const storedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const patientName = storedUser.name || "";
    const patientEmail = storedUser.email || "";

    /* =========================================
       States
    ========================================= */

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    const [appointment, setAppointment] = useState({
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
        phone: "",
        reason: "",
    });

    /* =========================================
       Fetch Doctors
    ========================================= */

    const fetchDoctors = async () => {
        try {
            setFetchLoading(true);

            const res = await api.get("/doctors");

            if (Array.isArray(res.data)) {
                setDoctors(res.data);
            } else if (Array.isArray(res.data.doctors)) {
                setDoctors(res.data.doctors);
            } else {
                setDoctors([]);
            }
        } catch (error) {
            console.log("Fetch Doctors Error:", error);
            toast.error("Unable to load doctors");
        } finally {
            setFetchLoading(false);
        }
    };

    /* =========================================
       Load Doctors
    ========================================= */

    useEffect(() => {
        fetchDoctors();
    }, []);

    /* =========================================
       Selected Doctor
    ========================================= */

    useEffect(() => {
        if (selectedDoctor?._id) {
            setAppointment((prev) => ({
                ...prev,
                doctor: selectedDoctor._id,
            }));
        }
    }, [selectedDoctor]);

    /* =========================================
       Handle Change
    ========================================= */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAppointment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* =========================================
       Submit Appointment
    ========================================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        /* Validation */

        if (!patientName) {
            toast.error("Please login as a patient first");
            return;
        }

        if (!appointment.phone) {
            toast.error("Please enter your phone number");
            return;
        }

        if (!/^[0-9]{10}$/.test(appointment.phone)) {
            toast.error("Please enter a valid 10 digit phone number");
            return;
        }

        if (!appointment.doctor) {
            toast.error("Please select a doctor");
            return;
        }

        if (!appointment.appointmentDate) {
            toast.error("Please select appointment date");
            return;
        }

        if (!appointment.appointmentTime) {
            toast.error("Please select appointment time");
            return;
        }

        if (!appointment.reason.trim()) {
            toast.error("Please enter reason for visit");
            return;
        }

        try {
            setLoading(true);

            /* =========================================
               Backend Payload
            ========================================= */

            const appointmentData = {
                patientName: patientName,
                email: patientEmail,
                phone: appointment.phone,
                doctor: appointment.doctor,
                appointmentDate: appointment.appointmentDate,
                appointmentTime: appointment.appointmentTime,
                problem: appointment.reason,
            };

            console.log(
                "Sending Appointment Data:",
                appointmentData
            );

            const res = await api.post(
                "/appointments/add",
                appointmentData
            );

            console.log(
                "Appointment Response:",
                res.data
            );

            toast.success(
                res.data.message ||
                "Appointment Booked Successfully!"
            );

            /* Reset form */

            setAppointment({
                doctor: "",
                appointmentDate: "",
                appointmentTime: "",
                phone: "",
                reason: "",
            });

            /* Go back to Patient Dashboard */

            setTimeout(() => {
                navigate("/patient-dashboard");
            }, 1200);

        } catch (error) {
            console.log(
                "Appointment Booking Error:",
                error
            );

            console.log(
                "Backend Error:",
                error.response?.data
            );

            toast.error(
                error.response?.data?.message ||
                "Appointment Booking Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    /* =========================================
       UI
    ========================================= */

    return (
        <div className="appointment-container">

            <div className="appointment-card">

                {/* HEADER */}

                <div className="appointment-header">

                    <h1>
                        📅 Book Appointment
                    </h1>

                    <p>
                        Schedule your consultation with our doctors
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* PATIENT NAME */}

                    <div className="input-group">

                        <label>
                            Patient Name
                        </label>

                        <input
                            type="text"
                            value={patientName}
                            readOnly
                            className="readonly-input"
                        />

                    </div>

                    {/* EMAIL */}

                    <div className="input-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={patientEmail}
                            readOnly
                            className="readonly-input"
                        />

                    </div>

                    {/* PHONE NUMBER */}

                    <div className="input-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter 10 digit phone number"
                            value={appointment.phone}
                            onChange={handleChange}
                            maxLength="10"
                            inputMode="numeric"
                            required
                        />

                    </div>

                    {/* DOCTOR */}

                    <div className="input-group">

                        <label>
                            Select Doctor
                        </label>

                        <select
                            name="doctor"
                            value={appointment.doctor}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Choose Doctor
                            </option>

                            {fetchLoading ? (

                                <option value="">
                                    Loading Doctors...
                                </option>

                            ) : doctors.length > 0 ? (

                                doctors.map((doctor) => (

                                    <option
                                        key={doctor._id}
                                        value={doctor._id}
                                    >
                                        Dr. {doctor.name}
                                        {" - "}
                                        {doctor.specialization}
                                    </option>

                                ))

                            ) : (

                                <option value="">
                                    No Doctors Available
                                </option>

                            )}

                        </select>

                    </div>

                    {/* DATE + TIME */}

                    <div className="input-row">

                        <div className="input-group">

                            <label>
                                Appointment Date
                            </label>

                            <input
                                type="date"
                                name="appointmentDate"
                                value={appointment.appointmentDate}
                                onChange={handleChange}
                                min={
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                                }
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label>
                                Appointment Time
                            </label>

                            <input
                                type="time"
                                name="appointmentTime"
                                value={appointment.appointmentTime}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    {/* REASON */}

                    <div className="input-group">

                        <label>
                            Reason for Visit
                        </label>

                        <textarea
                            name="reason"
                            placeholder="Enter your health problem"
                            value={appointment.reason}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={loading || fetchLoading}
                    >

                        {loading
                            ? "Booking..."
                            : "Confirm Appointment"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}

export default BookAppointment;
