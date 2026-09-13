import { useNavigate } from "react-router-dom";
import "../Components/styles/Hero.css"
import Navbar from "./Navbar";

function Hero() {
    const navigate = useNavigate();
    return (
        <section className="hero">
            <Navbar />
            <div className="hero-content">
                <span className="hero-tag">🏥 Trusted Healthcare</span>

                <h1>
                    Your Health Is <br />
                    Our Highest Priority
                </h1>

                <p>
                    Book appointments with experienced doctors,
                    manage medical records and receive quality
                    healthcare anytime.
                </p>

                <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => navigate("/book-appointment")}>
                        Book Appointment
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={() => navigate("/doctors")}
                    >
                        Find Doctor
                    </button>
                </div>
            </div>

            <div className="hero-image">
                <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
                    alt="Hospital"
                />
            </div>

        </section>

    );
}

export default Hero;