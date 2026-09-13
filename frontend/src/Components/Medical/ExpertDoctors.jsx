import React from "react";
import { FaUserMd, FaStar, FaCalendarCheck } from "react-icons/fa";
import "./ExpertDoctors.css";
import { useNavigate } from "react-router-dom";

function ExpertDoctors() {
    const navigate = useNavigate();

    const doctors = [
        {
            id: 1,
            name: "Dr. John Smith",
            specialization: "Cardiologist",
            experience: "12 Years",
            qualification: "MBBS, MD Cardiology",
            rating: "4.9",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            id: 2,
            name: "Dr. Sarah Wilson",
            specialization: "Neurologist",
            experience: "10 Years",
            qualification: "MBBS, DM Neurology",
            rating: "4.8",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 3,
            name: "Dr. Rahul Kumar",
            specialization: "Orthopedic",
            experience: "8 Years",
            qualification: "MBBS, MS Orthopedics",
            rating: "4.7",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
        },
        {
            id: 4,
            name: "Dr. Priya Sharma",
            specialization: "Pediatrician",
            experience: "9 Years",
            qualification: "MBBS, MD Pediatrics",
            rating: "4.9",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
            id: 5,
            name: "Dr. David Wilson",
            specialization: "Dermatologist",
            experience: "11 Years",
            qualification: "MBBS, MD Dermatology",
            rating: "4.8",
            image: "https://randomuser.me/api/portraits/men/15.jpg",
        },
        {
            id: 6,
            name: "Dr. Meena Devi",
            specialization: "Gynecologist",
            experience: "13 Years",
            qualification: "MBBS, MS Gynecology",
            rating: "5.0",
            image: "https://randomuser.me/api/portraits/women/20.jpg",
        },
    ];

    return (
        <section className="expert-doctors">

            <h2>👨‍⚕️ Meet Our Expert Doctors</h2>

            <p>
                Our experienced specialists are committed to providing
                world-class healthcare with compassion and advanced
                medical technology.
            </p>

            <div className="doctor-grid">

                {doctors.map((doctor) => (

                    <div className="doctor-card" key={doctor.id}>

                        <img
                            src={doctor.image}
                            alt={doctor.name}
                        />

                        <h3>{doctor.name}</h3>

                        <span className="speciality">
                            {doctor.specialization}
                        </span>

                        <p>{doctor.qualification}</p>

                        <p>Experience : {doctor.experience}</p>

                        <div className="rating">
                            <FaStar /> {doctor.rating}
                        </div>

                        <button onClick={() => navigate("/book-appointment")}>
                            <FaCalendarCheck />
                            &nbsp;Book Appointment
                        </button>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default ExpertDoctors;