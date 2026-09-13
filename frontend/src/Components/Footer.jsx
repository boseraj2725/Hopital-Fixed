import "./styles/Footer.css";
import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">
                    <h2>🏥 Medlora Hospital</h2>
                    <p>
                        SmartCare AI Hospital Management System
                        provides modern healthcare management with
                        secure patient records, appointments,
                        billing, and analytics.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/doctors">Doctors</Link></li>
                        {/* <li>Appointments</li> */}
                        {/* <li><Link to='/reports'>Reports</Link></li> */}
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>📍 Chennai, Tamil Nadu</p>
                    <p>📞 +91 98765 43210</p>
                    <p>📧 support@smartcareai.com</p>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Medlora Hospital Management System. All Rights Reserved.
            </div>

        </footer>
    );
}

export default Footer;