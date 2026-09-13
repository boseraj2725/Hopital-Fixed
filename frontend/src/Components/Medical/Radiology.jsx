import React from "react";
import { Link } from "react-router-dom";
import "./Radiology.css";

function Radiology() {
    return (
        <div className="radiology-page">

            <div className="radiology-container">

                <h1>🩻 Radiology Department</h1>

                <p className="subtitle">
                    We provide advanced diagnostic imaging services using
                    modern technology for accurate diagnosis and treatment.
                </p>

                <div className="radiology-grid">

                    <div className="radiology-card">
                        <h3>🩻 Digital X-Ray</h3>
                        <p>
                            High-quality digital X-Ray imaging with
                            low radiation exposure.
                        </p>
                    </div>

                    <div className="radiology-card">
                        <h3>🧠 MRI Scan</h3>
                        <p>
                            Detailed imaging of brain, spine and
                            internal organs.
                        </p>
                    </div>

                    <div className="radiology-card">
                        <h3>💻 CT Scan</h3>
                        <p>
                            Fast and accurate cross-sectional imaging
                            for diagnosis.
                        </p>
                    </div>

                    <div className="radiology-card">
                        <h3>👶 Ultrasound</h3>
                        <p>
                            Safe ultrasound imaging for pregnancy and
                            abdominal examinations.
                        </p>
                    </div>

                </div>

                <Link to="/book-appointment">
                    <button className="book-btn">
                        Book Radiology Appointment
                    </button>
                </Link>

            </div>

        </div>
    );
}

export default Radiology;