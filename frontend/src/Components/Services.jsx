import "../Components/styles/Services.css";
import {
    FaUserMd,
    FaHeartbeat,
    FaAmbulance,
    FaFlask,
    FaXRay,
    FaNotesMedical,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Services() {
    const navigate = useNavigate();

    const services = [
        {
            icon: <FaUserMd />,
            title: "Expert Doctors",
            desc: "Experienced specialists providing quality healthcare.",
            path: "/expert-doctors",
        },
        {
            icon: <FaHeartbeat />,
            title: "Cardiology",
            desc: "Complete heart care with modern equipment.",
            path: "/cardiology",
        },
        {
            icon: <FaAmbulance />,
            title: "Emergency",
            desc: "24/7 emergency medical support.",
            path: "/emergency",

        },
        {
            icon: <FaFlask />,
            title: "Laboratory",
            desc: "Fast and accurate laboratory testing.",
            path: "/laboratory",
        },
        {
            icon: <FaXRay />,
            title: "Radiology",
            desc: "Advanced X-Ray, CT Scan and MRI services.",
            path: "/radiology",
        },
        {
            icon: <FaNotesMedical />,
            title: "Medical Records",
            desc: "Secure digital patient records.",
            path: "/medical-records",
        },
    ];

    return (
        <section className="services">
            <h2>Our Medical Services</h2>

            <div className="services-grid">
                {services.map((item, index) => (
                    <div
                        className="service-card"
                        key={index}
                        onClick={() => {
                            if (item.path) {
                                navigate(item.path);
                            }
                        }}
                        style={{ cursor: item.path ? "pointer" : "default" }}
                    >
                        <div className="service-icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;