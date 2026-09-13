import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaUserMd, FaClock, FaMoneyBillWave } from "react-icons/fa";
import "../styles/DoctorProfile.css";
 
const doctors = [
    {
        id: 1,
        name: "Dr. John Smith",
        specialization: "Cardiologist",
        qualification: "MBBS, MD Cardiology",
        experience: "12 Years",
        fee: "₹500",
        rating: "4.9",
        patients: "5000+",
        available: "Mon - Sat | 9:00 AM - 5:00 PM",
        about:
            "Experienced Cardiologist with more than 12 years of expertise in heart disease treatment and cardiac surgery.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        name: "Dr. Sarah Johnson",
        specialization: "Neurologist",
        qualification: "MBBS, DM Neurology",
        experience: "10 Years",
        fee: "₹700",
        rating: "4.8",
        patients: "4200+",
        available: "Mon - Fri | 10:00 AM - 4:00 PM",
        about:
            "Expert Neurologist specialized in treating brain and nervous system disorders.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 3,
        name: "Dr. Michael Lee",
        specialization: "Orthopedic",
        qualification: "MBBS, MS Orthopedics",
        experience: "8 Years",
        fee: "₹600",
        rating: "4.7",
        patients: "3500+",
        available: "Mon - Sat | 8:00 AM - 2:00 PM",
        about:
            "Orthopedic surgeon specialized in bone and joint replacement treatments.",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
];

function DoctorProfile() {

    const { id } = useParams();
    const navigate = useNavigate();

    const doctor = doctors.find((d) => d.id === Number(id));

    if (!doctor) return <h2>Doctor Not Found</h2>;

    return (
        <div className="doctor-profile">

            <div className="profile-card">

                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="doctor-image"
                />

                <div className="profile-details">

                    <h1>{doctor.name}</h1>

                    <h3>{doctor.specialization}</h3>

                    <p><FaUserMd /> {doctor.qualification}</p>

                    <p><FaStar /> {doctor.rating} Rating</p>

                    <p>Experience : {doctor.experience}</p>

                    <p>Patients Treated : {doctor.patients}</p>

                    <p><FaMoneyBillWave /> Fee : {doctor.fee}</p>

                    <p><FaClock /> {doctor.available}</p>

                    <h2>About Doctor</h2>

                    <p>{doctor.about}</p>

                    <div className="buttons">

                        <button
                            className="book-btn"
                            onClick={() => navigate("/book-appointment")}
                        >
                            Book Appointment
                        </button>

                        <button
                            className="back-btn"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DoctorProfile;