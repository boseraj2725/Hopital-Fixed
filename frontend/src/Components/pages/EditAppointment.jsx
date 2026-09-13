import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/EditAppointment.css";

function EditAppointment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [appointment, setAppointment] = useState({
        patient: "",
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        status: "Pending",
    });

    // ==========================================
    // Fetch Appointment + Patients + Doctors
    // ==========================================

    useEffect(() => {
        fetchAllData();
    }, [id]);

    const fetchAllData = async () => {
        try {
            setFetchLoading(true);

            const [
                appointmentRes,
                patientsRes,
                doctorsRes,
            ] = await Promise.all([
                api.get(`/appointments/${id}`),
                api.get("/patients"),
                api.get("/doctors"),
            ]);

            // ==============================
            // Appointment
            // ==============================

            const data =
                appointmentRes.data.appointment;

            if (!data) {
                toast.error(
                    "Appointment not found"
                );

                navigate("/appointments");
                return;
            }

            // ==============================
            // Patients
            // ==============================

            const patientData =
                Array.isArray(patientsRes.data)
                    ? patientsRes.data
                    : patientsRes.data.patients || [];

            setPatients(patientData);

            // ==============================
            // Doctors
            // ==============================

            const doctorData =
                Array.isArray(doctorsRes.data)
                    ? doctorsRes.data
                    : doctorsRes.data.doctors || [];

            setDoctors(doctorData);

            // ==============================
            // Appointment State
            // ==============================

            setAppointment({
                patient:
                    data.patient?._id ||
                    data.patient ||
                    "",

                doctor:
                    data.doctor?._id ||
                    data.doctor ||
                    "",

                appointmentDate:
                    data.appointmentDate
                        ? new Date(
                              data.appointmentDate
                          )
                              .toISOString()
                              .substring(0, 10)
                        : "",

                appointmentTime:
                    data.appointmentTime || "",

                reason:
                    data.reason || "",

                status:
                    data.status || "Pending",
            });

        } catch (error) {
            console.log(
                "Fetch Appointment Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to Load Appointment"
            );
        } finally {
            setFetchLoading(false);
        }
    };

    // ==========================================
    // Handle Change
    // ==========================================

    const handleChange = (e) => {
        setAppointment((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ==========================================
    // Update Appointment
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        // Patient validation
        if (!appointment.patient) {
            toast.error(
                "Please select a patient"
            );
            return;
        }

        // Doctor validation
        if (!appointment.doctor) {
            toast.error(
                "Please select a doctor"
            );
            return;
        }

        try {
            setLoading(true);

            const updateData = {
                patient: appointment.patient,
                doctor: appointment.doctor,
                appointmentDate:
                    appointment.appointmentDate,
                appointmentTime:
                    appointment.appointmentTime,
                reason:
                    appointment.reason,
                status:
                    appointment.status,
            };

            console.log(
                "Updating Appointment:",
                updateData
            );

            const res = await api.put(
                `/appointments/update/${id}`,
                updateData
            );

            toast.success(
                res.data.message ||
                "Appointment Updated Successfully"
            );

            navigate("/appointments");

        } catch (error) {
            console.log(
                "Update Appointment Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Loading
    // ==========================================

    if (fetchLoading) {
        return (
            <div className="edit-loading">
                <div className="loading-spinner"></div>

                <p>
                    Loading Appointment...
                </p>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="edit-appointment">

            <form
                className="edit-form"
                onSubmit={handleSubmit}
            >

                {/* Header */}

                <div className="edit-header">

                    <span className="edit-icon">
                        ✏️
                    </span>

                    <div>
                        <h1>
                            Edit Appointment
                        </h1>

                        <p>
                            Update appointment details
                        </p>
                    </div>

                </div>

                {/* =================================
                    Patient
                ================================= */}

                <div className="form-group">

                    <label>
                        Patient
                    </label>

                    <select
                        name="patient"
                        value={
                            appointment.patient
                        }
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Patient
                        </option>

                        {patients.map(
                            (patient) => (
                                <option
                                    key={patient._id}
                                    value={
                                        patient._id
                                    }
                                >
                                    {patient.name}
                                </option>
                            )
                        )}

                    </select>

                </div>

                {/* =================================
                    Doctor
                ================================= */}

                <div className="form-group">

                    <label>
                        Doctor
                    </label>

                    <select
                        name="doctor"
                        value={
                            appointment.doctor
                        }
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Doctor
                        </option>

                        {doctors.map(
                            (doctor) => (
                                <option
                                    key={doctor._id}
                                    value={
                                        doctor._id
                                    }
                                >
                                    Dr. {doctor.name}
                                    {doctor.specialization
                                        ? ` - ${doctor.specialization}`
                                        : ""}
                                </option>
                            )
                        )}

                    </select>

                </div>

                {/* =================================
                    Date
                ================================= */}

                <div className="form-group">

                    <label>
                        Appointment Date
                    </label>

                    <input
                        type="date"
                        name="appointmentDate"
                        value={
                            appointment.appointmentDate
                        }
                        onChange={handleChange}
                        required
                    />

                </div>

                {/* =================================
                    Time
                ================================= */}

                <div className="form-group">

                    <label>
                        Appointment Time
                    </label>

                    <input
                        type="time"
                        name="appointmentTime"
                        value={
                            appointment.appointmentTime
                        }
                        onChange={handleChange}
                        required
                    />

                </div>

                {/* =================================
                    Reason
                ================================= */}

                <div className="form-group">

                    <label>
                        Reason
                    </label>

                    <textarea
                        name="reason"
                        value={
                            appointment.reason
                        }
                        onChange={handleChange}
                        placeholder="Enter appointment reason"
                        rows="4"
                        required
                    />

                </div>

                {/* =================================
                    Status
                ================================= */}

                <div className="form-group">

                    <label>
                        Appointment Status
                    </label>

                    <select
                        name="status"
                        value={
                            appointment.status
                        }
                        onChange={handleChange}
                    >

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

                {/* =================================
                    Buttons
                ================================= */}

                <div className="edit-buttons">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() =>
                            navigate(
                                "/appointments"
                            )
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="update-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Updating..."
                            : "Update Appointment"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditAppointment;