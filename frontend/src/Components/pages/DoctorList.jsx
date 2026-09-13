import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../../services/api";
import Loader from "./Loader";
import "../styles/DoctorList.css";

function DoctorList() {

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {

        setLoading(true);

        try {

            const res = await api.get("/doctors");

            setDoctors(res.data.doctors || []);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to Load Doctors"
            );

        } finally {

            setLoading(false);

        }

    };

    const deleteDoctor = async (id) => {

        const result = await Swal.fire({
            title: "Delete Doctor?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete",
        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/doctors/delete/${id}`);

            toast.success("Doctor Deleted Successfully");

            fetchDoctors();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    if (loading) {
        return <Loader />;
    }

    return (

        <div className="doctor-list">

            <h1>👨‍⚕️ Our Doctors</h1>

            <input
                type="text"
                className="search-box"
                placeholder="🔍 Search by Name or Specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="doctor-container">

                {doctors
                    .filter((doctor) =>
                        (doctor.name || "")
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        (doctor.specialization || "")
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((doctor) => (

                        <div
                            className="doctor-card"
                            key={doctor._id}
                        >

                            <h2>{doctor.name}</h2>

                            <p>
                                <strong>Specialization :</strong>{" "}
                                {doctor.specialization}
                            </p>

                            <p>
                                <strong>Department :</strong>{" "}
                                {doctor.department}
                            </p>

                            <p>
                                <strong>Experience :</strong>{" "}
                                {doctor.experience} Years
                            </p>

                            <p>
                                <strong>Email :</strong>{" "}
                                {doctor.email}
                            </p>

                            <p>
                                <strong>Phone :</strong>{" "}
                                {doctor.phone}
                            </p>

                            <div className="doctor-buttons">

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        navigate(`/edit-doctor/${doctor._id}`)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteDoctor(doctor._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                {doctors.length === 0 && (

                    <h2 className="no-data">
                        No Doctors Found
                    </h2>

                )}

            </div>

        </div>

    );

}

export default DoctorList;