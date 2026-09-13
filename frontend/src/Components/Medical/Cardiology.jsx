import React from "react";
import { FaHeartbeat, FaUserMd, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cardiology.css";

function Cardiology() {
    const navigate = useNavigate();

    const doctors = [
        {
            id: 1,
            name: "Dr. John Smith",
            experience: "12 Years",
            qualification: "MBBS, MD Cardiology",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            id: 2,
            name: "Dr. David Wilson",
            experience: "10 Years",
            qualification: "MBBS, DM Cardiology",
            image: "https://randomuser.me/api/portraits/men/15.jpg",
        },
    ];

    return (
        <section className="cardiology-page">

            <div className="cardiology-header">
                <FaHeartbeat className="heart-icon" />
                <h1>Cardiology Department</h1>

                <p>
                    Our Cardiology Department provides advanced diagnosis,
                    treatment and preventive care for all heart-related
                    diseases using modern technology.
                </p>
            </div>

            <h2>Our Cardiologists</h2>

            <div className="doctor-grid">
                {doctors.map((doctor) => (
                    <div className="doctor-card" key={doctor.id}>

                        <img
                            src={doctor.image}
                            alt={doctor.name}
                        />

                        <h3>{doctor.name}</h3>

                        <p>
                            <FaUserMd /> {doctor.qualification}
                        </p>

                        <p>Experience : {doctor.experience}</p>

                        <button
                            onClick={() => navigate("/book-appointment")}
                        >
                            <FaCalendarCheck />
                            &nbsp;Book Appointment
                        </button>

                    </div>
                ))}
            </div>

        </section>
    );
}

export default Cardiology;