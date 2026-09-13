import "../styles/HospitalProfile.css";

function HospitalProfile() {

    return (

        <div className="hospital-profile">

            <h1>🏥 Medlora Hospital</h1>

            <div className="profile-card">

                <h2>About Hospital</h2>

                <p>
                    SmartCare AI Hospital is a modern healthcare
                    management platform providing quality medical
                    services with experienced doctors and advanced
                    technology.
                </p>

                <div className="info-grid">

                    <div className="info-box">
                        <h3>📍 Address</h3>
                        <p>Chennai, Tamil Nadu</p>
                    </div>

                    <div className="info-box">
                        <h3>📞 Emergency</h3>
                        <p>+91 98765 43210</p>
                    </div>

                    <div className="info-box">
                        <h3>🕒 Working Hours</h3>
                        <p>24 × 7</p>
                    </div>

                    <div className="info-box">
                        <h3>🏥 Departments</h3>
                        <p>Cardiology, Neurology, Orthopedics, Pediatrics</p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default HospitalProfile;