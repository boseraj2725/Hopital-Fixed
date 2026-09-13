import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../styles/PatientList.css";

function PatientList() {

    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {

        try {

            const res = await api.get("/patients");

            setPatients(res.data.patients || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const deletePatient = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/patients/delete/${id}`);

            alert("Patient Deleted Successfully");

            fetchPatients();

        } catch (error) {

            alert("Delete Failed");

        }

    };


    if (loading) {
        return <h2 className="loading">Loading...</h2>;
    }


    return (

        <div className="patient-list">

            <h1>Patients</h1>


            <input
                type="text"
                className="search-box"
                placeholder="Search Patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />


            <div className="patient-container">


                {patients
                    .filter((patient) =>
                        patient.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        patient.phone.includes(search)
                    )
                    .map((patient) => (


                        <div
                            className="patient-card"
                            key={patient._id}
                        >


                            <h2>{patient.name}</h2>


                            <p>
                                <strong>Age:</strong> {patient.age}
                            </p>


                            <p>
                                <strong>Gender:</strong> {patient.gender}
                            </p>


                            <p>
                                <strong>Phone:</strong> {patient.phone}
                            </p>


                            <p>
                                <strong>Email:</strong> {patient.email}
                            </p>


                            <p>
                                <strong>Address:</strong> {patient.address}
                            </p>



                            <div className="patient-buttons">


                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        navigate(`/edit-patient/${patient._id}`)
                                    }
                                >
                                    Edit
                                </button>



                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deletePatient(patient._id)
                                    }
                                >
                                    Delete
                                </button>


                            </div>


                        </div>


                    ))}


            </div>


        </div>

    );

}


export default PatientList;