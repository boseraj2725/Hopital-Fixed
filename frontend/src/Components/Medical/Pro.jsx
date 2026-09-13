import { useParams } from "react-router-dom";
import "./Pro.css";

const doctors = [
    {
        id: 1,
        name: "Dr. John Smith",
        specialization: "Cardiologist",
        experience: "12 Years",
        qualification: "MBBS, MD Cardiology",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        name: "Dr. Sarah Johnson",
        specialization: "Neurologist",
        experience: "10 Years",
        qualification: "MBBS, DM Neurology",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 3,
        name: "Dr. Michael Lee",
        specialization: "Orthopedic",
        experience: "8 Years",
        qualification: "MBBS, MS Orthopedics",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
];


function Pro() {

    const { id } = useParams();


    const doctor = doctors.find(
        (d) => d.id === Number(id)
    );


    if (!doctor) {

        return (
            <div className="not-found">
                <h2>Doctor Not Found</h2>
            </div>
        );

    }


    return (

        <div className="doctor-profile">


            <div className="doctor-card">


                <img
                    className="doctor-image"
                    src={doctor.image}
                    alt={doctor.name}
                />


                <h1>
                    {doctor.name}
                </h1>


                <h3>
                    {doctor.specialization}
                </h3>


                <div className="doctor-details">


                    <div className="detail-box">

                        <span>
                            Qualification
                        </span>

                        <p>
                            {doctor.qualification}
                        </p>

                    </div>



                    <div className="detail-box">

                        <span>
                            Experience
                        </span>

                        <p>
                            {doctor.experience}
                        </p>

                    </div>


                </div>


                <button className="appointment-btn">
                    Book Appointment
                </button>


            </div>


        </div>

    );
}


export default Pro;